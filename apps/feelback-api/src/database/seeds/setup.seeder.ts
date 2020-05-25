import { ApiPathHelper } from '@cancerlog/util/core';
import * as fs from 'fs';
import * as path from 'path';
import { getConnection } from 'typeorm';
import { InstrumentEntity } from '../../app/modules/instrument/data/entities/instrument.entity';
import { OrganizationEntity } from '../../app/modules/organization/data/entities/organization.entity';

export async function seed() {
  const mainConnection = getConnection();

  const uulmOrganization: Partial<OrganizationEntity> = {
    name: 'Universitätsklinikum Ulm',
    description:
      '<p>Das Universitätsklinikum Ulm ist das jüngste der baden-württembergischen Universitätsklinika. In den 38 Jahren seiner Geschichte hat es sich einen festen Platz in der universitären Krankenversorgung, der Forschung und der Lehre erarbeitet. Heute ist es von der medizinischen und der wissenschaftlichen Landkarte der Region und des Landes nicht mehr wegzudenken.</p><p>Mit 29 Kliniken und 15 Instituten bietet es den Patient*innen der Region und darüber hinaus eine stationäre und ambulante Krankenversorgung auf höchstem Niveau. Jährlich werden am Universitätsklinikum rund 50.000 Patientinnen und Patienten stationär behandelt. Dazu kommen knapp 300.000 ambulante Quartalsfälle.</p><p>Im Jahr 2012 eröffnete das Klinikum einen hochmodernen Komplex für die Chirurgischen Kliniken und die Dermatologie - und für ein Maximum an Qualität und Komfort für unsere Patientinnen und Patienten.</p><p>Rund 6.000 Mitarbeiterinnen und Mitarbeiter kümmern sich hier und an den weiteren Standorten des Uniklinikums darum, dass bei uns universitäre Spitzenmedizin geleistet werden kann.</p>',
    type: 'Klinik',

    address: 'Albert-Einstein-Allee 23, 89081 Ulm',
    phone: '+49 / (0)731/500-0',
    email: 'info.allgemein@uniklinik-ulm.de',
    url: 'https://www.uniklinik-ulm.de',

    logo:
      'https://www.uniklinik-ulm.de/typo3conf/ext/as_template/Resources/Public/Images/logo.png',
  };

  const organizationRepository = mainConnection.getRepository(
    OrganizationEntity,
  );
  await organizationRepository.save([uulmOrganization]);

  const distressInstrument: Partial<InstrumentEntity> = {
    name: 'Distress Thermometer',
    description:
      'Das NCCN Distress-Thermometer ist ein vom National Comprehensive Cancer Network (NCCN) entwickeltes Screeninginstrument zur Erfassung psychosozialer Belastungen bei onkologischen Patienten.',
    type: 'Instrument',
    image:
      'https://www.gvec.org/wp-content/uploads/2019/10/Breast-Cancer-Awareness-Month-2019-1080x675.jpg',
    payload: JSON.parse(
      fs
        .readFileSync(
          path.join(
            ApiPathHelper.assetsPath('feelback-api'),
            'instruments',
            'distress-thermometer.json',
          ),
        )
        .toString(),
    ),
    rules: [
      {
        name: 'Distress',
        condition: 'DT01 > 5',
        then: 'Ein Text hier',
        else: '',
      },
    ],
    changelog: 'initial version',
    diagram: {
      history: {
        type: 'line',
        axis: {
          distress: 'DT01',
        },
      },
      overview: {
        type: 'radar',
        axis: {
          pp: '(PP01 + PP02 + PP03 + PP04 + PP05 + PP06 + PP07)/7',
          fp: '(FP01 + FP02)/2',
          ep: '(EP01 + EP02 + EP03 + EP04 + EP05 + EP06)/6',
          sp: '(SP01 + SP02)/2',
          kp:
            '(KP01 + KP02 + KP03 + KP04 + KP05 + KP06 + KP07 + KP08 + KP09 + KP10 + KP11 + KP12 + KP13 + KP14 + KP15 + KP16 + KP17 + KP18 + KP19 + KP20 + KP21 + KP22 + KP23)/23',
        },
      },
    },
  };

  const instrumentRepository = mainConnection.getRepository(InstrumentEntity);
  await instrumentRepository.save([distressInstrument]);
}
