/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { 
  Search, 
  Hospital, 
  MapPin, 
  Phone, 
  Info, 
  ArrowRight, 
  Filter,
  ChevronRight,
  Menu,
  X,
  Stethoscope,
  Building2,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { healthCenters, referralPaths, HealthCenter, ReferralPath } from './data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Custom Marker Icons
const createCustomIcon = (type: string, isSelected: boolean, id?: string) => {
  let color = '#64748b'; // Slate 500
  let content = '';
  let scale = isSelected ? 1.1 : 1;
  let showPulse = isSelected;

  if (id === 'DIR_SSA') {
    color = '#1e293b'; // Very dark slate
    content = '<span class="font-black text-[14px] font-display">SSA</span>';
    scale = isSelected ? 1.3 : 1.2;
    showPulse = true; // Always pulse for SSA
  }
  else if (type.includes('HOSPITAL')) {
    color = type === 'HOSPITAL_TIPO_4' ? '#475569' : '#0f172a';
    content = '<span class="font-black text-[13px] font-display">H</span>';
  }
  else if (type.includes('CESFAM')) {
    color = '#2563eb';
    content = '<span class="font-black text-[13px] font-display">C</span>';
  }
  else if (type === 'POSTA') {
    color = '#0ea5e9';
    content = '<span class="font-black text-[13px] font-display">P</span>';
  }
  else if (type === 'CECOSF') {
    color = '#0d9488';
    content = '<span class="font-black text-[11px] font-display">CF</span>';
  }
  else if (type === 'URGENCIA') {
    color = '#e11d48';
    content = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style="width: 16px; height: 16px;">
                <path d="M12 9v6M9 12h6M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" />
              </svg>`;
  }
  else if (type === 'COSAM' || type === 'ESPECIALIDAD') {
    color = '#7c3aed';
    content = '<span class="font-black text-[13px] font-display">E</span>';
  }
  else if (type === 'ADMIN') {
    color = '#94a3b8';
    content = '<span class="font-black text-[13px] font-display">A</span>';
  }
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-container" style="color: ${color}">
            ${showPulse ? '<div class="marker-pulse"></div>' : ''}
            <div class="marker-icon-wrapper" style="border-color: ${color}; transform: scale(${scale}); ${id === 'DIR_SSA' ? 'border-width: 3px; background: white;' : ''}">
              ${content}
            </div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Component to handle map centering
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-32.75, -70.75]);
  const [mapZoom, setMapZoom] = useState(10);

  const filteredCenters = useMemo(() => {
    return healthCenters.filter(center => {
      const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           center.commune.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesType = filterType === 'all';
      if (filterType === 'Hospital') matchesType = center.type.includes('HOSPITAL');
      else if (filterType === 'CESFAM') matchesType = center.type.includes('CESFAM');
      else if (filterType === 'Otros') matchesType = !center.type.includes('HOSPITAL') && !center.type.includes('CESFAM');
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const activeReferrals = useMemo(() => {
    // If a center is selected, show its incoming and outgoing
    if (selectedCenter) {
      return referralPaths.filter(path => path.fromId === selectedCenter.id || path.toId === selectedCenter.id);
    }
    // Otherwise show all
    return referralPaths;
  }, [selectedCenter]);

  // Haversine distance calculation in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const handleSelectCenter = (center: HealthCenter) => {
    setSelectedCenter(center);
    setMapCenter([center.lat, center.lng]);
    setMapZoom(15);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-[320px_1fr] grid-rows-[64px_1fr] h-screen w-full overflow-hidden bg-background font-sans">
      {/* Header */}
      <header className="col-span-2 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-slate-200">
            A
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">Red Aconcagua</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mapa de Derivaciones</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Estado de Red</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operativa
            </span>
          </div>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-slate-900" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className={cn(
          "relative z-20 flex flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out overflow-hidden",
          !isSidebarOpen && "pointer-events-none"
        )}
      >
        <div className="p-6 space-y-6 flex flex-col h-full min-w-[320px]">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Buscar centro o comuna..." 
                className="pl-10 bg-slate-50 border-slate-200 focus:ring-slate-900 h-11 text-sm rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">Filtro de Red</label>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {activeReferrals.length} flujos
                </span>
              </div>
              <Tabs defaultValue="all" className="w-full" onValueChange={setFilterType}>
                <TabsList className="grid grid-cols-4 w-full bg-slate-100 p-1 rounded-xl h-10">
                  <TabsTrigger value="all" className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Todos</TabsTrigger>
                  <TabsTrigger value="Hospital" className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Hosp.</TabsTrigger>
                  <TabsTrigger value="CESFAM" className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">CESFAM</TabsTrigger>
                  <TabsTrigger value="Otros" className="text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Otros</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">Establecimientos</h2>
              <Badge variant="outline" className="text-[9px] font-bold text-slate-400 border-slate-200">
                {filteredCenters.length}
              </Badge>
            </div>
            <ScrollArea className="flex-1 -mx-2 px-2">
              <div className="space-y-2 pb-4">
                {filteredCenters.map((center) => (
                  <div 
                    key={center.id}
                    className={cn(
                      "p-3 border rounded-xl cursor-pointer transition-all duration-200 group",
                      selectedCenter?.id === center.id 
                        ? "bg-slate-900 border-slate-900 shadow-lg shadow-slate-200" 
                        : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                    )}
                    onClick={() => handleSelectCenter(center)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={cn(
                          "font-bold text-xs truncate mb-1",
                          selectedCenter?.id === center.id ? "text-white" : "text-slate-900"
                        )}>
                          {center.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "text-[10px] flex items-center gap-1 font-medium",
                            selectedCenter?.id === center.id ? "text-slate-400" : "text-slate-400"
                          )}>
                            <MapPin className="w-3 h-3" /> {center.commune}
                          </p>
                          <Badge variant="outline" className={cn(
                            "text-[8px] h-4 px-1.5 uppercase font-black tracking-tighter border-current opacity-60",
                            selectedCenter?.id === center.id ? "text-white" : "text-slate-500"
                          )}>
                            {center.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 mt-1 transition-transform group-hover:translate-x-0.5",
                        selectedCenter?.id === center.id ? "text-white" : "text-slate-300"
                      )} />
                    </div>
                  </div>
                ))}
                {filteredCenters.length === 0 && (
                  <div className="text-center py-10 text-slate-400 text-[11px] font-medium italic">
                    No se encontraron centros.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="pt-6 mt-auto">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-widest py-6 rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98]">
              Exportar Reporte de Red
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="relative bg-[#e8ebf0]">
        {/* Map Container */}
        <div className="w-full h-full p-6">
          <div className="w-full h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden relative border border-slate-100">
            <div className="map-vignette" />
            <MapContainer 
              center={mapCenter} 
              zoom={mapZoom} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              preferCanvas={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />

              <ChangeView center={mapCenter} zoom={mapZoom} />

              {healthCenters.map((center) => (
                <Marker 
                  key={center.id} 
                  position={[center.lat, center.lng]}
                  icon={createCustomIcon(center.type, selectedCenter?.id === center.id, center.id)}
                  eventHandlers={{
                    click: () => handleSelectCenter(center)
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-sm text-primary">{center.name}</h3>
                      <p className="text-xs text-muted-foreground">{center.type.replace('_', ' ')}</p>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 mt-2 text-secondary font-bold"
                        onClick={() => handleSelectCenter(center)}
                      >
                        Ver detalles <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </Popup>
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    <div className="px-2 py-1 font-display font-bold text-[11px] text-slate-900">
                      {center.name}
                    </div>
                  </Tooltip>
                </Marker>
              ))}

              {/* Referral Lines */}
              {activeReferrals.map((path, idx) => {
                const from = healthCenters.find(c => c.id === path.fromId);
                const to = healthCenters.find(c => c.id === path.toId);
                if (!from || !to) return null;

                const isSelected = selectedCenter ? (selectedCenter.id === from.id || selectedCenter.id === to.id) : false;
                const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
                
                // Refined colors for a modern look
                let pathColor = "#94a3b8"; // Default Slate
                if (path.type === 'APS') pathColor = "#3b82f6"; // Blue
                else if (path.type === 'DERIVACION') pathColor = "#6366f1"; // Indigo
                else if (path.type === 'HOSPITAL') pathColor = "#0f172a"; // Dark Slate
                else if (path.type === 'ALTA_COMPLEJIDAD') pathColor = "#e11d48"; // Rose
                else if (path.type === 'SALUD_MENTAL') pathColor = "#8b5cf6"; // Violet
                else if (path.type === 'URGENCIA') pathColor = "#f43f5e"; // Rose 500

                return (
                  <Polyline 
                    key={`${path.fromId}-${path.toId}-${idx}`}
                    positions={[[from.lat, from.lng], [to.lat, to.lng]]}
                    color={selectedCenter ? (isSelected ? pathColor : "#f1f5f9") : pathColor}
                    weight={selectedCenter ? (isSelected ? 3 : 1) : 1.5}
                    className={cn(
                      "flow-line",
                      selectedCenter && !isSelected && "opacity-10"
                    )}
                    opacity={selectedCenter ? (isSelected ? 1 : 0.1) : 0.4}
                    smoothFactor={1.5}
                  >
                    <Popup>
                      <div className="text-[11px] p-2 min-w-[180px]">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter">
                            {path.type}
                          </Badge>
                          <span className="text-muted-foreground font-mono">{distance} km</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1" />
                            <p className="flex-1 leading-tight"><span className="text-muted-foreground">Origen:</span> <br/><span className="font-bold">{from.name}</span></p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
                            <p className="flex-1 leading-tight"><span className="text-muted-foreground">Destino:</span> <br/><span className="font-bold">{to.name}</span></p>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Polyline>
                );
              })}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-6 right-6 z-20 glass-panel border border-white/40 rounded-2xl p-5 shadow-2xl max-h-[350px] overflow-y-auto w-56">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5 font-display">Red de Salud SSA</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-900 bg-slate-100/50 p-2 rounded-lg border border-slate-200">
                  <div className="w-5 h-5 rounded-md border-2 border-[#1e293b] flex items-center justify-center text-[#1e293b] font-display text-[9px] font-black bg-white">SSA</div>
                  <span>Dirección SSA</span>
                </div>
                
                <Separator className="my-2 opacity-30" />

                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-md border-2 border-[#0f172a] flex items-center justify-center text-[#0f172a] font-display">H</div>
                  <span>Hospital (T1 / T2-3)</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-md border-2 border-[#475569] flex items-center justify-center text-[#475569] font-display">H</div>
                  <span>Hospital Tipo 4</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-md border-2 border-[#2563eb] flex items-center justify-center text-[#2563eb] font-display">C</div>
                  <span>CESFAM</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-md border-2 border-[#0ea5e9] flex items-center justify-center text-[#0ea5e9] font-display">P</div>
                  <span>Posta (PSR)</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-md border-2 border-[#0d9488] flex items-center justify-center text-[#0d9488] text-[9px] font-display">CF</div>
                  <span>CECOSF</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-md border-2 border-[#e11d48] flex items-center justify-center text-[#e11d48]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <path d="M12 9v6M9 12h6M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" />
                    </svg>
                  </div>
                  <span>Urgencia</span>
                </div>
                
                <Separator className="my-3 opacity-50" />
                
                <h5 className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-wider">Flujos de Derivación</h5>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-6 h-0.5 rounded-full bg-[#3b82f6]" />
                  <span>APS</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-6 h-0.5 rounded-full bg-[#6366f1]" />
                  <span>Derivación</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-6 h-0.5 rounded-full bg-[#0f172a]" />
                  <span>Hospitalización</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                  <div className="w-6 h-0.5 rounded-full bg-[#e11d48]" />
                  <span>Alta Complejidad</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Center Details Overlay */}
        <AnimatePresence>
          {selectedCenter && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-2xl"
            >
              <Card className="shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-white/40 glass-panel rounded-3xl overflow-hidden">
                <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0 bg-white/40">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn(
                        "text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full",
                        selectedCenter.type.includes('HOSPITAL') ? 'bg-slate-900' : selectedCenter.type.includes('CESFAM') ? 'bg-blue-600' : 'bg-slate-500'
                      )}>
                        {selectedCenter.type.replace('_', ' ')}
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-display">
                        {selectedCenter.commune}
                      </span>
                    </div>
                    <CardTitle className="text-2xl text-slate-900 font-black tracking-tight font-display">{selectedCenter.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 mt-1.5 text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {selectedCenter.address}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-white/50 rounded-full" onClick={() => setSelectedCenter(null)}>
                    <X className="w-5 h-5 text-slate-400" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-secondary tracking-widest mb-2.5 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" /> Información General
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {selectedCenter.description || "Sin descripción disponible."}
                        </p>
                      </div>
                      {selectedCenter.phone && (
                        <div className="flex items-center gap-2.5 text-sm font-semibold text-primary">
                          <div className="p-1.5 bg-accent rounded-full">
                            <Phone className="w-4 h-4" />
                          </div>
                          <span>{selectedCenter.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-5">
                      <h4 className="text-[10px] font-black uppercase text-secondary tracking-widest mb-2.5 flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5" /> Flujo de Derivación
                      </h4>
                      <div className="space-y-2.5">
                        {activeReferrals.length > 0 ? (
                          activeReferrals.map((path, idx) => {
                            const isSource = path.fromId === selectedCenter.id;
                            const otherCenter = healthCenters.find(c => c.id === (isSource ? path.toId : path.fromId));
                            const distance = otherCenter ? calculateDistance(selectedCenter.lat, selectedCenter.lng, otherCenter.lat, otherCenter.lng) : "0";
                            
                            return (
                              <div key={idx} className="flex flex-col p-3 rounded-lg bg-accent/40 text-xs border border-secondary/10">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2.5">
                                    <div className={cn(
                                      "w-2 h-2 rounded-full",
                                      isSource ? "bg-secondary" : "bg-[#e67e22]"
                                    )} />
                                    <span className="font-bold text-primary">{path.type}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-[9px] font-bold">
                                    {distance} km
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <span className="text-[10px] uppercase font-bold opacity-60">{isSource ? 'Hacia' : 'Desde'}</span>
                                  <span className="font-bold text-foreground truncate max-w-[150px]">
                                    {otherCenter?.name}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border text-center">
                            <p className="text-xs text-muted-foreground italic">No se registran rutas de derivación activas.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
