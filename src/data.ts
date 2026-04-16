export interface HealthCenter {
  id: string;
  name: string;
  type: string;
  address: string;
  commune: string;
  lat: number;
  lng: number;
  description?: string;
  phone?: string;
}

export interface ReferralPath {
  fromId: string;
  toId: string;
  type: string;
  quantity: number;
  description?: string;
}

export const healthCenters: HealthCenter[] = [
  { id: 'DIR_SSA', name: 'Servicio de Salud Aconcagua (SSA)', type: 'ADMIN', address: 'Pasaje Juana Ross 928, San Felipe', commune: 'San Felipe', lat: -32.751969, lng: -70.72457 },
  { id: 'PRAIS', name: 'PRAIS', type: 'ADMIN', address: 'PRAIS', commune: 'San Felipe', lat: -32.751969, lng: -70.72457 },
  { id: 'CSF', name: 'Centro de Salud Funcionaria', type: 'ADMIN', address: 'CSF', commune: 'San Felipe', lat: -32.751969, lng: -70.72457 },
  { id: 'HOSP_SAN_FELIPE', name: 'Hospital San Camilo', type: 'HOSPITAL_TIPO_2_3', address: 'San Felipe', commune: 'San Felipe', lat: -32.749769, lng: -70.708991 },
  { id: 'HOSP_LOS_ANDES', name: 'Hospital San Juan de Dios', type: 'HOSPITAL_TIPO_2_3', address: 'Los Andes', commune: 'Los Andes', lat: -32.829664, lng: -70.596429 },
  { id: 'HOSP_LLAILLAY', name: 'Hospital de Llay Llay', type: 'HOSPITAL_TIPO_4', address: 'Llay Llay', commune: 'Llay Llay', lat: -32.84277, lng: -70.954944 },
  { id: 'HOSP_PUTAENDO', name: 'Hospital S.A de Putaendo', type: 'HOSPITAL_TIPO_4', address: 'Putaendo', commune: 'Putaendo', lat: -32.622064, lng: -70.717848 },
  { id: 'HOSP_PSIQUIATRICO', name: 'Hospital Psiquiatrico', type: 'HOSPITAL_TIPO_2_3', address: 'Putaendo', commune: 'Putaendo', lat: -32.619019, lng: -70.688607 },
  { id: 'CESFAM_LLAILLAY', name: 'CESFAM Llay Llay', type: 'CESFAM_URBANO', address: 'Llay Llay', commune: 'Llay Llay', lat: -32.842585, lng: -70.952703 },
  { id: 'CESFAM_RINCONADA', name: 'CESFAM Rinconada', type: 'CESFAM_RURAL', address: 'Rinconada', commune: 'Rinconada', lat: -32.845292, lng: -70.68723 },
  { id: 'CESFAM_SAN_ESTEBAN', name: 'CESFAM San Esteban', type: 'CESFAM_RURAL', address: 'San Esteban', commune: 'San Esteban', lat: -32.805146, lng: -70.573622 },
  { id: 'CESFAM_CATEMU', name: 'CESFAM Catemu Eduardo Raggio', type: 'CESFAM_RURAL', address: 'Catemu', commune: 'Catemu', lat: -32.778537, lng: -70.9618 },
  { id: 'CESFAM_PUTAENDO', name: 'CESFAM Putaendo Valle Los Libertadores', type: 'CESFAM_RURAL', address: 'Putaendo', commune: 'Putaendo', lat: -32.622531, lng: -70.718121 },
  { id: 'CESFAM_SAN_FELIPE_EL_REAL', name: 'CESFAM San Felipe El Real', type: 'CESFAM_URBANO', address: 'San Felipe', commune: 'San Felipe', lat: -32.758839, lng: -70.725627 },
  { id: 'CESFAM_CORDILLERA', name: 'CESFAM Cordillera Andina', type: 'CESFAM_URBANO', address: 'Los Andes', commune: 'Los Andes', lat: -32.827913, lng: -70.597247 },
  { id: 'CESFAM_CENTENARIO', name: 'CESFAM Centenario', type: 'CESFAM_URBANO', address: 'Los Andes', commune: 'Los Andes', lat: -32.839303, lng: -70.603386 },
  { id: 'CESFAM_CALLE_LARGA', name: 'CESFAM Calle Larga', type: 'CESFAM_RURAL', address: 'Calle Larga', commune: 'Calle Larga', lat: -32.861201, lng: -70.62835 },
  { id: 'CESFAM_STA_MARIA', name: 'CESFAM Santa María', type: 'CESFAM_RURAL', address: 'Santa María', commune: 'Santa María', lat: -32.75076, lng: -70.657415 },
  { id: 'CESFAM_CURIMON', name: 'CESFAM Curimón', type: 'CESFAM_RURAL', address: 'Curimón', commune: 'San Felipe', lat: -32.783633, lng: -70.688649 },
  { id: 'CESFAM_PANQUEHUE', name: 'CESFAM Panquehue María Elena Peñaloza', type: 'CESFAM_RURAL', address: 'Panquehue', commune: 'Panquehue', lat: -32.782111, lng: -70.852121 },
  { id: 'CESFAM_SEGISMUNDO', name: 'CESFAM Segismundo Iturra', type: 'CESFAM_URBANO', address: 'San Felipe', commune: 'San Felipe', lat: -32.738858, lng: -70.726591 },
  { id: 'PSR_CARINO_BOTADO', name: 'PSR Cariño Botado', type: 'POSTA', address: 'Cariño Botado', commune: 'San Esteban', lat: -32.795605, lng: -70.556442 },
  { id: 'PSR_AHUMADA', name: 'PSR Campos de Ahumada', type: 'POSTA', address: 'Campos de Ahumada', commune: 'San Esteban', lat: -32.710985, lng: -70.54447 },
  { id: 'PSR_RIO_COLORADO', name: 'PSR Río Colorado', type: 'POSTA', address: 'Río Colorado', commune: 'Los Andes', lat: -32.854677, lng: -70.461398 },
  { id: 'PSR_RIO_BLANCO', name: 'PSR Río Blanco', type: 'POSTA', address: 'Río Blanco', commune: 'Los Andes', lat: -32.909433, lng: -70.304351 },
  { id: 'PSR_SAN_VICENTE', name: 'PSR San Vicente', type: 'POSTA', address: 'San Vicente', commune: 'Calle Larga', lat: -32.887723, lng: -70.591353 },
  { id: 'PSR_PIGUCHEN', name: 'PSR Piguchén', type: 'POSTA', address: 'Piguchén', commune: 'Putaendo', lat: -32.569972, lng: -70.690625 },
  { id: 'PSR_GUZMANES', name: 'PSR Guzmanes', type: 'POSTA', address: 'Guzmanes', commune: 'Putaendo', lat: -32.582743, lng: -70.733998 },
  { id: 'PSR_STA_FILOMENA', name: 'PSR Santa Filomena', type: 'POSTA', address: 'Santa Filomena', commune: 'Santa María', lat: -32.70201, lng: -70.617514 },
  { id: 'PSR_LA_ORILLA', name: 'PSR La Orilla', type: 'POSTA', address: 'La Orilla', commune: 'Putaendo', lat: -32.65693, lng: -70.702426 },
  { id: 'PSR_QUEBRADA', name: 'PSR Quebrada Herrera', type: 'POSTA', address: 'Quebrada Herrera', commune: 'Putaendo', lat: -32.699294, lng: -70.751436 },
  { id: 'CECOSF_LO_CALVO', name: 'CECOSF Lo Calvo', type: 'CECOSF', address: 'Lo Calvo', commune: 'San Esteban', lat: -32.751829, lng: -70.591717 },
  { id: 'CECOSF_CERRILLOS', name: 'CECOSF Cerrillos', type: 'CECOSF', address: 'Cerrillos', commune: 'Catemu', lat: -32.69382, lng: -70.928961 },
  { id: 'CECOSF_JUAN_PABLO', name: 'CECOSF Juan Pablo II', type: 'CECOSF', address: 'Juan Pablo II', commune: 'Los Andes', lat: -32.838209, lng: -70.613038 },
  { id: 'CECOSF_TOCORNAL', name: 'CECOSF Tocornal', type: 'CECOSF', address: 'Tocornal', commune: 'Santa María', lat: -32.696064, lng: -70.732581 },
  { id: 'CECOSF_CORNELISSEN', name: 'CECOSF Eugenio Cornelissen', type: 'CECOSF', address: 'Eugenio Cornelissen', commune: 'Panquehue', lat: -32.782111, lng: -70.852121 },
  { id: 'CECOSF_COIMAS', name: 'CECOSF Estación Las Coimas', type: 'CECOSF', address: 'Estación Las Coimas', commune: 'Putaendo', lat: -32.696064, lng: -70.732581 },
  { id: 'COSAM_SAN_FELIPE', name: 'COSAM San Felipe', type: 'COSAM', address: 'San Felipe', commune: 'San Felipe', lat: -32.758839, lng: -70.725627 },
  { id: 'COSAM_LOS_ANDES', name: 'COSAM Los Andes', type: 'COSAM', address: 'Los Andes', commune: 'Los Andes', lat: -32.833911, lng: -70.599909 },
  { id: 'SAR_CENTENARIO', name: 'SAR Centenario', type: 'URGENCIA', address: 'Centenario', commune: 'Los Andes', lat: -32.839454, lng: -70.603241 },
  { id: 'SUR_CALLE_LARGA', name: 'SUR Calle Larga', type: 'URGENCIA', address: 'Calle Larga', commune: 'Calle Larga', lat: -32.861201, lng: -70.62835 },
  { id: 'SUR_CATEMU', name: 'SUR Catemu', type: 'URGENCIA', address: 'Catemu', commune: 'Catemu', lat: -32.778537, lng: -70.9618 },
  { id: 'SUR_STA_MARIA', name: 'SUR Santa Maria', type: 'URGENCIA', address: 'Santa Maria', commune: 'Santa María', lat: -32.750704, lng: -70.657437 },
  { id: 'SUR_SAN_ESTEBAN', name: 'SUR San Esteban', type: 'URGENCIA', address: 'San Esteban', commune: 'San Esteban', lat: -32.805146, lng: -70.573622 },
  { id: 'SUR_RINCONADA', name: 'SUR Rinconada', type: 'URGENCIA', address: 'Rinconada', commune: 'Rinconada', lat: -32.845292, lng: -70.68723 },
  { id: 'SUR_PANQUEHUE', name: 'SUR Panquehue', type: 'URGENCIA', address: 'Panquehue', commune: 'Panquehue', lat: -32.782111, lng: -70.852121 },
  { id: 'CENTRO_DEMENCIA', name: 'Centro Apoyo Comunitario Demencia Quicalcura', type: 'ESPECIALIDAD', address: 'Los Andes', commune: 'Los Andes', lat: -32.835245, lng: -70.594216 },
  { id: 'CECOSF_LAS_CADENAS', name: 'CECOSF Las Cadenas', type: 'CECOSF', address: 'Las Cadenas', commune: 'Santa María', lat: -32.735, lng: -70.645 },
  { id: 'HOSP_TIPO_1', name: 'Hospital Alta Complejidad (Tipo 1)', type: 'HOSPITAL_TIPO_1', address: 'Santiago', commune: 'Santiago', lat: -33.4489, lng: -70.6693 }
];

export const referralPaths: ReferralPath[] = [
  // POSTAS → CECOSF
  { fromId: 'PSR_PIGUCHEN', toId: 'CECOSF_COIMAS', type: 'APS', quantity: 10 },
  { fromId: 'PSR_GUZMANES', toId: 'CECOSF_COIMAS', type: 'APS', quantity: 8 },
  { fromId: 'PSR_LA_ORILLA', toId: 'CECOSF_COIMAS', type: 'APS', quantity: 10 },
  { fromId: 'PSR_QUEBRADA', toId: 'CECOSF_COIMAS', type: 'APS', quantity: 12 },
  { fromId: 'PSR_STA_FILOMENA', toId: 'CECOSF_LAS_CADENAS', type: 'APS', quantity: 10 },

  // CECOSF → CESFAM RURAL
  { fromId: 'CECOSF_COIMAS', toId: 'CESFAM_PUTAENDO', type: 'APS', quantity: 7 },
  { fromId: 'CECOSF_LAS_CADENAS', toId: 'CESFAM_STA_MARIA', type: 'APS', quantity: 12 },
  { fromId: 'PSR_QUEBRADA', toId: 'CESFAM_CURIMON', type: 'APS', quantity: 10 },
  { fromId: 'CECOSF_CERRILLOS', toId: 'CESFAM_CATEMU', type: 'APS', quantity: 13 },
  { fromId: 'CECOSF_JUAN_PABLO', toId: 'CESFAM_CENTENARIO', type: 'APS', quantity: 1 },
  { fromId: 'CECOSF_LO_CALVO', toId: 'CESFAM_SAN_ESTEBAN', type: 'APS', quantity: 8 },

  // POSTAS → CESFAM RURAL (directos)
  { fromId: 'PSR_RIO_BLANCO', toId: 'CESFAM_CENTENARIO', type: 'APS', quantity: 30 },
  { fromId: 'PSR_SAN_VICENTE', toId: 'CESFAM_CALLE_LARGA', type: 'APS', quantity: 3 },
  { fromId: 'PSR_CARINO_BOTADO', toId: 'CESFAM_SAN_ESTEBAN', type: 'APS', quantity: 4 },
  { fromId: 'PSR_AHUMADA', toId: 'CESFAM_SAN_ESTEBAN', type: 'APS', quantity: 15 },
  { fromId: 'PSR_RIO_COLORADO', toId: 'CESFAM_SAN_ESTEBAN', type: 'APS', quantity: 29 },

  // CESFAM RURAL → CESFAM URBANO
  { fromId: 'CESFAM_STA_MARIA', toId: 'CESFAM_SAN_FELIPE_EL_REAL', type: 'DERIVACION', quantity: 8 },
  { fromId: 'CESFAM_CURIMON', toId: 'CESFAM_SEGISMUNDO', type: 'DERIVACION', quantity: 6 },
  { fromId: 'CESFAM_PANQUEHUE', toId: 'CESFAM_SEGISMUNDO', type: 'DERIVACION', quantity: 12 },
  { fromId: 'CESFAM_CATEMU', toId: 'CESFAM_LLAILLAY', type: 'DERIVACION', quantity: 8 },

  // CESFAM URBANO → HOSPITAL TIPO 4
  { fromId: 'CESFAM_SAN_FELIPE_EL_REAL', toId: 'HOSP_PUTAENDO', type: 'HOSPITAL', quantity: 1 },
  { fromId: 'CESFAM_SEGISMUNDO', toId: 'HOSP_PUTAENDO', type: 'HOSPITAL', quantity: 2 },
  { fromId: 'CESFAM_LLAILLAY', toId: 'HOSP_LLAILLAY', type: 'HOSPITAL', quantity: 0 },
  { fromId: 'CESFAM_CENTENARIO', toId: 'HOSP_LOS_ANDES', type: 'HOSPITAL', quantity: 1 },
  { fromId: 'CESFAM_CORDILLERA', toId: 'HOSP_LOS_ANDES', type: 'HOSPITAL', quantity: 0 },
  { fromId: 'CESFAM_RINCONADA', toId: 'HOSP_LOS_ANDES', type: 'HOSPITAL', quantity: 1 },
  { fromId: 'CESFAM_CALLE_LARGA', toId: 'HOSP_LOS_ANDES', type: 'HOSPITAL', quantity: 1 },
  { fromId: 'CESFAM_SAN_ESTEBAN', toId: 'HOSP_LOS_ANDES', type: 'HOSPITAL', quantity: 1 },

  // URGENCIAS (SUR/SAR) → HOSPITAL (Mismo que su CESFAM)
  { fromId: 'SAR_CENTENARIO', toId: 'HOSP_LOS_ANDES', type: 'URGENCIA', quantity: 1 },
  { fromId: 'SUR_CALLE_LARGA', toId: 'HOSP_LOS_ANDES', type: 'URGENCIA', quantity: 1 },
  { fromId: 'SUR_CATEMU', toId: 'HOSP_LLAILLAY', type: 'URGENCIA', quantity: 1 },
  { fromId: 'SUR_STA_MARIA', toId: 'HOSP_SAN_FELIPE', type: 'URGENCIA', quantity: 1 },
  { fromId: 'SUR_SAN_ESTEBAN', toId: 'HOSP_LOS_ANDES', type: 'URGENCIA', quantity: 1 },
  { fromId: 'SUR_RINCONADA', toId: 'HOSP_LOS_ANDES', type: 'URGENCIA', quantity: 1 },
  { fromId: 'SUR_PANQUEHUE', toId: 'HOSP_SAN_FELIPE', type: 'URGENCIA', quantity: 1 },

  // HOSPITAL TIPO 4 → HOSPITAL TIPO 2-3
  { fromId: 'HOSP_PUTAENDO', toId: 'HOSP_SAN_FELIPE', type: 'HOSPITAL', quantity: 15 },
  { fromId: 'HOSP_LLAILLAY', toId: 'HOSP_SAN_FELIPE', type: 'HOSPITAL', quantity: 30 },

  // HOSPITAL TIPO 2-3 → HOSPITAL TIPO 1
  { fromId: 'HOSP_SAN_FELIPE', toId: 'HOSP_TIPO_1', type: 'ALTA_COMPLEJIDAD', quantity: 127 },
  { fromId: 'HOSP_LOS_ANDES', toId: 'HOSP_TIPO_1', type: 'ALTA_COMPLEJIDAD', quantity: 145 },
  { fromId: 'HOSP_PSIQUIATRICO', toId: 'HOSP_TIPO_1', type: 'ALTA_COMPLEJIDAD', quantity: 143 }
];
