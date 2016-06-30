export default
{
  roles:
  [
      {id:1,name:'Admin'}
      ,{id:2,name:'User'}
  ],
  currs:
  [
      {id:1,name:'USD'}
      ,{id:2,name:'AED'}
      ,{id:3,name:'SAR'}
      ,{id:4,name:'OMR'}
      ,{id:5,name:'JOD'}
      ,{id:6,name:'LBP'}
  ],
  companies:
  [
      {id:1,code:'CSL',name:'CSL'}
      ,{id:2,code:'MAM',name:'MAM'}
      ,{id:3,code:'MAT',name:'MAT'}
      ,{id:4,code:'MDO',name:'MDO'}
      ,{id:5,code:'MJW',name:'MJW'}
      ,{id:6,code:'MME',name:'MME'}
      ,{id:7,code:'MMF',name:'MMF'}
      ,{id:8,code:'MMU',name:'MMU'}
      ,{id:9,code:'STS',name:'STS'}
  ],
  locations:
  [
      {id:1,code:'CSL-APS',name:'CSL-APS', comid:1}
      ,{id:2,code:'CSL-CNS',name:'CSL-CNS', comid:1}
      ,{id:3,code:'CSL.HO',name:'CSL.HO', comid:1}
      ,{id:4,code:'LEB.AB',name:'Comptoir Suisse Lebanon', comid:1}
      ,{id:5,code:'LEB.ABCD',name:'CSL ABC Dbayeh Mall', comid:1}
      ,{id:6,code:'LEB.CH',name:'Chopard Gold Souk', comid:1}
      ,{id:7,code:'LEB.DF',name:'Beirut Airport Duty Free', comid:1}
      ,{id:8,code:'LEB.GS',name:'Mouawad Gold Souk', comid:1}
      ,{id:9,code:'LEB.HU',name:'Hublot Gold Souk', comid:1}
      ,{id:10,code:'LEB.MVB',name:'LEB.MVB', comid:1}
      ,{id:11,code:'JOR.RO',name:'Le Royal Hotel', comid:2}
      ,{id:12,code:'MAM.APS',name:'MAM.APS', comid:2}
      ,{id:13,code:'MAM-CNS',name:'MAM-CNS', comid:2}
      ,{id:14,code:'MAM.HO',name:'MAM.HO', comid:2}
      ,{id:15,code:'MAT-CNS',name:'MAT-CNS', comid:3}
      ,{id:16,code:'MAT.HO',name:'MAT.HO', comid:3}
      ,{id:17,code:'SAU.AM',name:'SAU.AM', comid:3}
      ,{id:18,code:'SAU.JS',name:'Mouawad Jameel Square', comid:3}
      ,{id:19,code:'SAU.KC',name:'SAU.KC', comid:3}
      ,{id:20,code:'SAU.MAC',name:'Mouawad Aknaz Center', comid:3}
      ,{id:21,code:'MDO-APS',name:'MDO-APS', comid:4}
      ,{id:22,code:'MDO-CNS',name:'MDO-CNS', comid:4}
      ,{id:23,code:'MDO.HO',name:'MDO.HO', comid:4}
      ,{id:24,code:'QAT.LA',name:'Mouawad Doha-Lagoona Mall', comid:4}
      ,{id:25,code:'MJW-APS',name:'MJW-APS', comid:5}
      ,{id:26,code:'MJW-CNS',name:'MJW-CNS', comid:5}
      ,{id:27,code:'MJW.HO',name:'MJW.HO', comid:5}
      ,{id:28,code:'UAE.DM',name:'Mouawad Dubai Mall', comid:5}
      ,{id:29,code:'UAE.NT',name:'Mouawad Nation Tower', comid:5}
      ,{id:30,code:'MME.AT',name:'MME.AT', comid:6}
      ,{id:31,code:'MME.HO',name:'MME.HO', comid:6}
      ,{id:32,code:'MME-APS',name:'MME-APS', comid:6}
      ,{id:33,code:'MME-CNS',name:'MME-CNS', comid:6}
      ,{id:34,code:'MMF.APS',name:'MMF.APS', comid:7}
      ,{id:35,code:'MMF.CNS',name:'MMF.CNS', comid:7}
      ,{id:36,code:'MMF.HO',name:'MMF.HO', comid:7}
      ,{id:37,code:'MMU-APS',name:'MMU-APS', comid:8}
      ,{id:38,code:'MMU-CNS',name:'MMU-CNS', comid:8}
      ,{id:39,code:'MMU.HO',name:'MMU.HO', comid:8}
      ,{id:40,code:'OMA.OG',name:'Mouawad Opera Galleria', comid:8}
      ,{id:41,code:'STS.HO',name:'STS.HO', comid:9}
      ,{id:42,code:'STS-APS',name:'STS-APS', comid:9}
      ,{id:43,code:'STS.JEDTAH',name:'STS.JEDTAH', comid:9}
      ,{id:44,code:'STS.MKHAM',name:'STS.MKHAM', comid:9}
      ,{id:45,code:'STS.RUHAKN',name:'STS.RUHAKN', comid:9}
  ],
  warehouses:
  [
    {id:1,code: 'CSL.APPR',name: 'CSL Approval Warehouse',locationid: 1}
    ,{id:2,code: 'CSL.CONS',name: 'CSL Consignment Warehouse',locationid: 2}
    ,{id:3,code: 'CSL.TRAN',name: 'CSL Transit Warehouse',locationid: 3}
    ,{id:4,code: 'LEB.AB1',name: 'Comptoir Suisse Lebanon',locationid: 4}
    ,{id:5,code: 'LEB.ABCD1',name: 'CSL ABC Dbayeh Mall',locationid: 5}
    ,{id:6,code: 'LEB.CH',name: 'Chopard Gold Souk',locationid: 6}
    ,{id:7,code: 'LEB.DF1',name: 'Beirut Airport Duty Free',locationid: 7}
    ,{id:8,code: 'LEB.GS',name: 'Mouawad Gold Souk',locationid: 8}
    ,{id:9,code: 'LEB.HU',name: 'Hublot Gold Souk',locationid: 9}
    ,{id:10,code: 'LEB.MVB',name: 'Mouawad Grand Hill Hotel',locationid: 10}
    ,{id:11,code: 'JOR.RO1',name: 'MAM Le Royal Hotel Mouawad Amman',locationid: 11}
    ,{id:12,code: 'MAM.APPR',name: 'MAM Approval Warehouse',locationid: 12}
    ,{id:13,code: 'MAM.CONS',name: 'MAM Consignment Warehouse',locationid: 13}
    ,{id:14,code: 'MAM.TRAN',name: 'MAM Transit Warehouse',locationid: 14}
    ,{id:15,code: 'MAT.APPR',name: 'MAT Approval Warehouse',locationid: 15}
    ,{id:16,code: 'MAT.CONS',name: 'MAT Consigment Warehouse',locationid: 16}
    ,{id:17,code: 'MAT.TRAN',name: 'MAT Transit Warehouse',locationid: 16}
    ,{id:18,code: 'MGT.FACF01',name: 'OBJETSF',locationid: 16}
    ,{id:19,code: 'MGT.FACG02',name: 'ATELIERSF - Semi-Finished',locationid: 16}
    ,{id:20,code: 'MGT.FACG10',name: 'SCATRY01',locationid: 16}
    ,{id:21,code: 'MGT.FACP01',name: 'Factory Pricer',locationid: 16}
    ,{id:22,code: 'MGT.FACS05',name: 'Broken Stone',locationid: 16}
    ,{id:23,code: 'MGT.FACS11',name: 'Precious & Semi Precious Stones',locationid: 16}
    ,{id:24,code: 'MGT.FACSE1',name: 'Precious & Semi Precious Stones',locationid: 16}
    ,{id:25,code: 'MGT.FACSE8',name: 'Semi Precious Stone (GP)',locationid: 16}
    ,{id:26,code: 'MGT.FACW04',name: 'Watches Location 4',locationid: 16}
    ,{id:27,code: 'MGT.HO1',name: 'Central Safe , Head Office',locationid: 16}
    ,{id:28,code: 'MGT.HOBA',name: 'Head Office MBB Goods',locationid: 16}
    ,{id:29,code: 'MGT.HOCTL',name: 'Control Department - MHS',locationid: 16}
    ,{id:30,code: 'MGT.HOD',name: 'Lady,s Watches Counter',location: 16}
    ,{id:31,code: 'MGT.HOEXAD',name: 'External Relation Administration',locationid: 16}
    ,{id:32,code: 'MGT.HOHRD',name: 'Human Resource Department',locationid: 16}
    ,{id:33,code: 'MGT.HOOBA',name: 'Object of Arts counter',locationid: 16}
    ,{id:34,code: 'MZA6',name: 'S',locationid: 17}
    ,{id:35,code: 'SAU.AM1',name: 'Alrashid Mall',locationid: 17}
    ,{id:36,code: 'SAU.BA1',name: 'Administrator',locationid: 16}
    ,{id:37,code: 'SAU.BA11',name: 'ROGER DUBUIS WATCHES',locationid: 16}
    ,{id:38,code: 'SAU.BA12',name: 'Repairs',locationid: 16}
    ,{id:39,code: 'SAU.BA6',name: 'Other Watches',locationid: 16}
    ,{id:40,code: 'SAU.BA7',name: 'Roberge Watches',locationid: 16}
    ,{id:41,code: 'SAU.Custom',name: 'Customs',locationid: 16}
    ,{id:42,code: 'SAU.JS',name: 'Mouawad jameel Square',locationid: 18}
    ,{id:43,code: 'SAU.JSRP',name: 'Royal Protocol GOC,s',locationid: 16}
    ,{id:44,code: 'SAU.JSVIP',name: 'VIP Customers GOC,s',locationid: 16}
    ,{id:45,code: 'SAU.KC',name: 'Kingdom Center',locationid: 19}
    ,{id:46,code: 'SAU.MAC',name: 'Mouawad Aknaz Center',locationid: 20}
    ,{id:47,code: 'SAU.MACRP',name: 'Royal Protocol GOC,s',locationid: 16}
    ,{id:48,code: 'SAU.MACVIP',name: 'VIP Customers GOC,s',locationid: 16}
    ,{id:49,code: 'SAU.MIS',name: 'General Warehouse, Jeddah',locationid: 16}
    ,{id:50,code: 'SAU.OL1',name: 'Mouawad new Olaya Transit',locationid: 16}
    ,{id:51,code: 'SAU.OLM2',name: 'Mouawad New Olaya M2',locationid: 16}
    ,{id:52,code: 'SAU.OLSTA',name: 'Swiss Time Avenue, Riyadh',locationid: 16}
    ,{id:53,code: 'SAU.YING',name: 'Ying Mashwara',locationid: 16}
    ,{id:54,code: 'TRANSITR60',name: 'Riyadh 60 Administrator',locationid: 16}
    ,{id:55,code: 'MDO.APPR',name: 'MDO Approval Warehouse',locationid: 21}
    ,{id:56,code: 'MDO.CONS',name: 'MDO Consignment Warehouse',locationid: 22}
    ,{id:57,code: 'MDO.TRAN',name: 'MDO Transit Warehouse',locationid: 23}
    ,{id:58,code: 'QAT.FSH',name: 'Four Season Hotel',locationid: 23}
    ,{id:59,code: 'QAT.LA',name: 'Mouawad Jewellery, Doha-Lagoona Mall',locationid: 24}
    ,{id:60,code: 'MJW.APPR',name: 'MJW Approval Warehouse',locationid: 25}
    ,{id:61,code: 'MJW.CONS',name: 'MJW Consignment Warehouse',locationid: 26}
    ,{id:62,code: 'MJW.TRAN',name: 'MJW Transit Warehouse',locationid: 27}
    ,{id:63,code: 'UAE.DM1',name: 'Mouawad Dubai Mall',locationid: 28}
    ,{id:64,code: 'UAE.NT1',name: 'Mouawad Nation Tower',locationid: 29}
    ,{id:65,code: 'BAH.MAL1',name: 'Diwan Al Malaki',locationid: 30}
    ,{id:66,code: 'MAL.SH1',name: 'Mouawad Kuala Lumpur',locationid: 30}
    ,{id:67,code: 'MBC.FAC1',name: 'Mouawad Bangkok for melting',locationid: 30}
    ,{id:68,code: 'MBC.FAC2',name: 'Mouawad Bangkok for melting',locationid: 30}
    ,{id:69,code: 'MBC.MEL',name: 'Mouawad Bangkok for melting',locationid: 30}
    ,{id:70,code: 'MGT.HOBAH',name: 'Mouawad Bahrain (showroom closed)',locationid: 30}
    ,{id:71,code: 'MGT.HOBRN',name: 'BRUNEI-R',locationid: 30}
    ,{id:72,code: 'MGT.HORUZ',name: 'Ruzzone',locationid: 30}
    ,{id:73,code: 'MJOR.RO1',name: 'Mouawad Amman',locationid: 31}
    ,{id:74,code: 'MKUW.HL1',name: 'Mouawad Kuwait',locationid: 31}
    ,{id:75,code: 'MLEB.AB1',name: 'Comptoir Suisse Lebanon',locationid: 31}
    ,{id:76,code: 'MLEB.ABCD1',name: 'CSL ABC Dbayeh Mall',locationid: 31}
    ,{id:77,code: 'MLEB.CH',name: 'Chopard Gold Souk',locationid: 31}
    ,{id:78,code: 'MLEB.DF1',name: 'Beirut Airport Duty Free',locationid: 31}
    ,{id:79,code: 'MLEB.GS',name: 'Mouawad Gold Souk',locationid: 31}
    ,{id:80,code: 'MLEB.HU',name: 'Hublot Gold Souk',locationid: 31}
    ,{id:81,code: 'MLEB.RMM',name: 'Robert Mouawad Museum',locationid: 31}
    ,{id:82,code: 'MME.APPR',name: 'MME Approval Warehouse',locationid: 32}
    ,{id:83,code: 'MME.CONS',name: 'MME Consigment Warehouse',locationid: 33}
    ,{id:84,code: 'MME.MPM',name: 'Mr. Pascal Mouawad',locationid: 30}
    ,{id:85,code: 'MME.Other',name: 'Other Company Stock',locationid: 31}
    ,{id:86,code: 'MME.TRAN',name: 'MME Transit Warehouse',locationid: 30}
    ,{id:87,code: 'MME.UAEFAC',name: 'Factory Consignment Stock',locationid: 30}
    ,{id:88,code: 'MMM.FAC1',name: 'Manufacture Mouawad SA (ltd.)',locationid: 30}
    ,{id:89,code: 'MOMA.KP1',name: 'Mouawad Muscat',locationid: 31}
    ,{id:90,code: 'MOMA.OG1',name: 'Mouawad Opera Galleria',locationid: 31}
    ,{id:91,code: 'MQAT.LA',name: 'Mouawad Jewellery, Doha-Lagoona Mall',locationid: 31}
    ,{id:92,code: 'MSA.HO1',name: 'Mouawad Geneva',locationid: 30}
    ,{id:93,code: 'MSA.HOEX1',name: 'MSA Geneva',locationid: 30}
    ,{id:94,code: 'MSA.PF1',name: 'Mouawad SA - Port Franc',locationid: 30}
    ,{id:95,code: 'MSAU.AM1',name: 'Khobar Showroom',locationid: 31}
    ,{id:96,code: 'MSAU.BA11',name: 'ROGER DUBUIS WATCHES',locationid: 31}
    ,{id:97,code: 'MSAU.BA12',name: 'Repairs',locationid: 31}
    ,{id:98,code: 'MSAU.BA6',name: 'Other Watches',locationid: 31}
    ,{id:99,code: 'MSAU.BA7',name: 'Roberge Watches',locationid: 31}
    ,{id:100,code: 'MSAU.JS',name: 'Mouawad Jameel Square',locationid: 31}
    ,{id:101,code: 'MSAU.MAC',name: 'Mouawad Aknaz Center',locationid: 31}
    ,{id:102,code: 'MUAE.DM1',name: 'Mouawad Dubai Mall',locationid: 31}
    ,{id:103,code: 'MUAE.NT1',name: 'Mouawad Nation Tower',locationid: 31}
    ,{id:104,code: 'SIN.FH1',name: 'Mouawad Singapore',locationid: 30}
    ,{id:105,code: 'UAE.AA1',name: 'Mr. Ahmad Alaily',locationid: 30}
    ,{id:106,code: 'UAE.AT1',name: 'Mouawad Dubai Almas Tower',locationid: 30}
    ,{id:107,code: 'UAE.CERT',name: 'Al Mas Certificates (LAB)',locationid: 30}
    ,{id:108,code: 'UAE.HRD',name: 'Human Resource Department > Dubai',locationid: 30}
    ,{id:109,code: 'UAE.JSA',name: 'Dubai Jewelry Safe 1',locationid: 30}
    ,{id:110,code: 'UAE.JSA1',name: 'Dubai Jewelry Safe 1',locationid: 30}
    ,{id:111,code: 'UAE.OSA',name: 'Dubai Object of Arts Safe',locationid: 30}
    ,{id:112,code: 'UAE.WSA',name: 'Dubai Watches Safe',locationid: 30}
    ,{id:113,code: 'USA.HO1',name: 'Mouawad USA',locationid: 30}
    ,{id:114,code: 'USA.PGEM',name: 'Premier Gem Corp',locationid: 30}
    ,{id:115,code: 'MMF.APPR',name: 'MMF Approval Warehouse',locationid: 34}
    ,{id:116,code: 'MMF.CONS',name: 'MMF Consignment Warehouse',locationid: 35}
    ,{id:117,code: 'MMF.FACP',name: 'Dubai Factory Pricing',locationid: 36}
    ,{id:118,code: 'MMF.TRAN',name: 'MMF Transit Warehouse',locationid: 36}
    ,{id:119,code: 'UAE.FAC01',name: 'Mouawad Mena Factory - Safe',locationid: 36}
    ,{id:120,code: 'UAE.FAC02',name: 'Mouawad Mena Factory - OBJ',locationid: 36}
    ,{id:121,code: 'UAE.FAC03',name: 'UAE Factory',locationid: 36}
    ,{id:122,code: 'UAE.FAC04',name: 'UAE Factory',locationid: 36}
    ,{id:123,code: 'MMU.APPR',name: 'MMU Approval Warehouse',locationid: 37}
    ,{id:124,code: 'MMU.CONS',name: 'MMU Consignment Warehouse',locationid: 38}
    ,{id:125,code: 'MMU.TRAN',name: 'MMU Transit Warehouse',locationid: 39}
    ,{id:126,code: 'OMA.KP1',name: 'Mouawad Muscat',locationid: 39}
    ,{id:127,code: 'OMA.OG1',name: 'MMU Mouawad Opera Galleria',locationid: 40}
    ,{id:128,code: 'STS.ACT',name: 'STS-Actual',locationid: 41}
    ,{id:129,code: 'STS.APPR',name: 'STS Approval Warehouse',locationid: 42}
    ,{id:130,code: 'STS.DXB',name: 'STS-Dubai DXB',locationid: 41}
    ,{id:131,code: 'STS.GVA01',name: 'STS - Geneva Exhibition',locationid: 41}
    ,{id:132,code: 'STS.HK1',name: 'STS Hong Kong',locationid: 41}
    ,{id:133,code: 'STS.HODXB1',name: 'STS - Dubai Head Office',locationid: 41}
    ,{id:134,code: 'STS.HOJED1',name: 'STS - Jeddah Head Office',locationid: 41}
    ,{id:135,code: 'STS.HOKP',name: 'STS - Head Office K.S.A Pricing',locationid: 41}
    ,{id:136,code: 'STS.HORUH1',name: 'STS - Riyadh Head Office',locationid: 41}
    ,{id:137,code: 'STS.JEDTAH',name: 'STS-Jeddah Tahlia Mall Showroom',locationid: 43}
    ,{id:138,code: 'STS.MAL1',name: 'STS - MALAYSIA',locationid: 41}
    ,{id:139,code: 'STS.MBCMEL',name: 'STS melting location',locationid: 41}
    ,{id:140,code: 'STS.MKHAM1',name: 'STS - Khobar Al Rashed Mall Showroom',locationid: 44}
    ,{id:141,code: 'STS.RUHAKN',name: 'STS - Riyadh Aknaz Centre Showroom',locationid: 45}
    ,{id:142,code: 'STS.SIN1',name: 'STS - SINGAPORE',locationid: 41}
    ,{id:143,code: 'STS.SOLD',name: 'STS-Sold SKU',locationid: 41}
    ,{id:144,code: 'STS.TRAN',name: 'STS Transit Warehouse',locationid: 41}
    ,{id:145,code: 'STS.UAETRB',name: 'STA Dubai Trebor Jewelry Stock',locationid: 41}
  ],
  countries:[
    {id:1,name: 'British Virgin Islands'}
    ,{id:2,name: 'Hong Kong'}
    ,{id:3,name: 'Jordan'}
    ,{id:4,name: 'Kingdom of Saudi Arabia (KSA)'}
    ,{id:5,name: 'Kuwait'}
    ,{id:6,name: 'Lebanon'}
    ,{id:7,name: 'Malaysia'}
    ,{id:8,name: 'Oman'}
    ,{id:9,name: 'Qatar'}
    ,{id:10,name: 'Singapore'}
    ,{id:11,name: 'Switzerland'}
    ,{id:12,name: 'Thailand'}
    ,{id:13,name: 'United Arab Emirates'}
    ,{id:14,name: 'USA'}
  ],
  productGroups:[
    {id:1,code: 'STO',name: 'Stone'}
    ,{id:2,code: 'JLY',name: 'Jewelry'}
    ,{id:3,code: 'WAT',name: 'Watch'}
    ,{id:4,code: 'ACC',name: 'Accessory'}
    ,{id:5,code: 'OBA',name: 'Object Of Art'}
    ,{id:6,code: 'SPP',name: 'Spare Parts'}
  ],
  // ----------------------------------
  stoneType:[
    {id:1,name: 'Agate'}
    ,{id:2,name: 'Amethyst'}
    ,{id:3,name: 'Aquamarine'}
    ,{id:4,name: 'Brown Obsidian'}
    ,{id:5,name: 'Citrine'}
    ,{id:6,name: 'Diamond'}
    ,{id:7,name: 'Diamond Factory - Broken stones'}
    ,{id:8,name: 'Diamond on consignment with us (GOC)'}
    ,{id:9,name: 'Emerald'}
    ,{id:10,name: 'Emerald Factory - Broken stone'}
    ,{id:11,name: 'Emerald on consignment with us (GOC)'}
    ,{id:12,name: 'Garnet'}
    ,{id:13,name: 'Jadeite'}
    ,{id:14,name: 'Kunzite'}
    ,{id:15,name: 'Mother of Pearl'}
    ,{id:16,name: 'None'}
    ,{id:17,name: 'Onyx'}
    ,{id:18,name: 'Opal'}
    ,{id:19,name: 'Other'}
    ,{id:20,name: 'Pearl'}
    ,{id:21,name: 'Pearl on consignment with us (GOC)'}
    ,{id:22,name: 'Peridot'}
    ,{id:23,name: 'Prayer Beads GPY on consignment with us (GOC)'}
    ,{id:24,name: 'Prayer Beads Stone'}
    ,{id:25,name: 'Ruby'}
    ,{id:26,name: 'Ruby on consignment with us (GOC)'}
    ,{id:27,name: 'Sapphire'}
    ,{id:28,name: 'Sapphire Factory - Broken stone'}
    ,{id:29,name: 'Sapphire on consignment with us (GOC)'}
    ,{id:30,name: 'Semi Precious Stone'}
    ,{id:31,name: 'Semi Precious Stone - Broken stones'}
    ,{id:32,name: 'Semi-precious on consignment with us (GOC)'}
    ,{id:33,name: 'Spinel'}
    ,{id:34,name: 'Tanzanite'}
    ,{id:35,name: 'Topaz'}
    ,{id:36,name: 'Tourmaline'}
    ,{id:37,name: 'Tsavorite'}
    ,{id:38,name: 'Turquoise'}
  ],
  cutShape:[
    {id:1,name: 'Asscher'}
    ,{id:2,name: 'Baguette'}
    ,{id:3,name: 'Bead'}
    ,{id:4,name: 'Briolette'}
    ,{id:5,name: 'Cabochon'}
    ,{id:6,name: 'Cushion'}
    ,{id:7,name: 'Drop'}
    ,{id:8,name: 'Emerald Cut'}
    ,{id:9,name: 'Fancy'}
    ,{id:10,name: 'Half Moon'}
    ,{id:11,name: 'Heart'}
    ,{id:12,name: 'Hexagonal'}
    ,{id:13,name: 'Kite'}
    ,{id:14,name: 'Marquise'}
    ,{id:15,name: 'Octagonal'}
    ,{id:16,name: 'Oval'}
    ,{id:17,name: 'Pear'}
    ,{id:18,name: 'Princess Cut'}
    ,{id:19,name: 'Radiant'}
    ,{id:20,name: 'Rectangular'}
    ,{id:21,name: 'Rose Cut'}
    ,{id:22,name: 'Round'}
    ,{id:23,name: 'Single Cut'}
    ,{id:24,name: 'Square'}
    ,{id:25,name: 'Sugar Loaf'}
    ,{id:26,name: 'Taper'}
    ,{id:27,name: 'Triangle'}
    ,{id:28,name: 'Trilliant'}
  ],
  cutGrades:[
    {id:	1,name: 'Excellent'}
    ,{id:	2,name: 'Ideal'}
    ,{id:	3,name: 'Very Good'}
    ,{id:	4,name: 'Good'}
    ,{id:	5,name: 'Fair'}
    ,{id:	6,name: 'Poor'}
  ],
  colors:[
    {id:	'AMB'	,name: 'Amber'}
    ,{id:	'BEG'	,name: 'Beige'}
    ,{id:	'BLK'	,name: 'Black'}
    ,{id:	'BLU'	,name: 'Blue'}
    ,{id:	'BRN'	,name: 'Brown'}
    ,{id:	'BRN-FDRK'	,name: 'Brown Fancy Dark'}
    ,{id:	'BRN-FLGT'	,name: 'Brown Fancy Light'}
    ,{id:	'BRN-FNT'	,name: 'Brown Faint'}
    ,{id:	'BRN-LGT'	,name: 'Brown Light'}
    ,{id:	'BRN-VLGT'	,name: 'Brown Very Light'}
    ,{id:	'CRM'	,name: 'Cream'}
    ,{id:	'CU'	,name: 'Copper'}
    ,{id:	'D'	,name: 'White'}
    ,{id:	'D-E'	,name: 'White'}
    ,{id:	'D-F'	,name: 'White'}
    ,{id:	'DINT'	,name: 'Yellow'}
    ,{id:	'DRK'	,name: 'Yellow'}
    ,{id:	'DRK-BLU'	,name: 'Dark Blue'}
    ,{id:	'E'	,name: 'White'}
    ,{id:	'E-F'	,name: 'White'}
    ,{id:	'F'	,name: 'White'}
    ,{id:	'FC-BRN'	,name: 'Fancy Brown'}
    ,{id:	'FC-BYEL'	,name: 'Fancy Brownish Yellow'}
    ,{id:	'FCDPPPNK'	,name: 'Fancy Deep Purplish Pink'}
    ,{id:	'FC-DYEL'	,name: 'Fancy Deep Yellow'}
    ,{id:	'FC-IPNK'	,name: 'Fancy Intense Pink'}
    ,{id:	'FC-IYEL'	,name: 'Fancy Intense Yellow'}
    ,{id:	'FC-LPNK'	,name: 'Fancy Light Pink'}
    ,{id:	'FC-LYEL'	,name: 'Fancy Light Yellow'}
    ,{id:	'FC-OBRN'	,name: 'Fancy Orangey Brown'}
    ,{id:	'FC-ORN'	,name: 'Fancy Orange'}
    ,{id:	'FC-PNK'	,name: 'Fancy Pink'}
    ,{id:	'FC-VBLU'	,name: 'Fancy Vivid Blue'}
    ,{id:	'FC-VPNK'	,name: 'Fancy Vivid Pink'}
    ,{id:	'FC-VRED'	,name: 'Fancy Vivid Red'}
    ,{id:	'FC-VYEL'	,name: 'Fancy Vivid Yellow'}
    ,{id:	'FCY'	,name: 'Fancy'}
    ,{id:	'FC-YBRN'	,name: 'Fanc Yellowish Brown'}
    ,{id:	'FC-YGRN'	,name: 'Fancy Yellowish Green'}
    ,{id:	'FC-YORN'	,name: 'Fance Yellowish Orange'}
    ,{id:	'FC-YPNK'	,name: 'Fancy Yellow Pink'}
    ,{id:	'FCY-X-Y'	,name: 'Fancy'}
    ,{id:	'FCY-YLW'	,name: 'Fancy Yellow'}
    ,{id:	'FDEP'	,name: 'Yellow'}
    ,{id:	'FDRK'	,name: 'Grey'}
    ,{id:	'F-G'	,name: 'White'}
    ,{id:	'F-H'	,name: 'White'}
    ,{id:	'F-I'	,name: 'White'}
    ,{id:	'FLGT'	,name: 'Yellow'}
    ,{id:	'FVVD'	,name: 'Yellow'}
    ,{id:	'G'	,name: 'White'}
    ,{id:	'G-H'	,name: 'White'}
    ,{id:	'G-I'	,name: 'Brown'}
    ,{id:	'GLD'	,name: 'Gold'}
    ,{id:	'GRN'	,name: 'Green'}
    ,{id:	'GRY'	,name: 'Grey'}
    ,{id:	'GRY-LGT'	,name: 'Grey Light'}
    ,{id:	'GRY-VLGT'	,name: 'Grey Very Light'}
    ,{id:	'H'	,name: 'White'}
    ,{id:	'H-F'	,name: 'H-F'}
    ,{id:	'H-G'	,name: 'White'}
    ,{id:	'H-I'	,name: 'White'}
    ,{id:	'H-J'	,name: 'White'}
    ,{id:	'I'	,name: 'Yellow'}
    ,{id:	'I-J'	,name: 'White'}
    ,{id:	'I-K'	,name: 'White'}
    ,{id:	'J'	,name: 'White'}
    ,{id:	'J-K'	,name: 'White'}
    ,{id:	'K'	,name: 'White'}
    ,{id:	'K-L'	,name: 'White'}
    ,{id:	'K-M'	,name: 'White'}
    ,{id:	'K-N'	,name: 'White'}
    ,{id:	'L'	,name: 'White'}
    ,{id:	'LGT'	,name: 'Pink'}
    ,{id:	'LGT-BLU'	,name: 'Light Blue'}
    ,{id:	'M'	,name: 'Yellow'}
    ,{id:	'MED'	,name: 'Yellow'}
    ,{id:	'MED-BLK'	,name: 'Medium Black'}
    ,{id:	'MED-BLU'	,name: 'Medium Blue'}
    ,{id:	'MED-FCY'	,name: 'Medium Fancy'}
    ,{id:	'MED-GRN'	,name: 'Medium Green'}
    ,{id:	'MED-ORN'	,name: 'Medium Orange'}
    ,{id:	'MED-PNK'	,name: 'Medium Pink'}
    ,{id:	'MED-RED'	,name: 'Medium Red'}
    ,{id:	'MED-VLT'	,name: 'Medium Violet'}
    ,{id:	'MED-WHT'	,name: 'Medium White'}
    ,{id:	'MIX'	,name: 'Mix Color'}
    ,{id:	'N'	,name: 'White'}
    ,{id:	'N-O'	,name: 'N-O'}
    ,{id:	'O'	,name: 'White'}
    ,{id:	'O-P'	,name: 'Yellow'}
    ,{id:	'ORN'	,name: 'Orange'}
    ,{id:	'PNK'	,name: 'Pink'}
    ,{id:	'PPK'	,name: 'Purplish Pink'}
    ,{id:	'P-Q'	,name: 'Yellow'}
    ,{id:	'PRP'	,name: 'Purple'}
    ,{id:	'Q-R'	,name: 'Yellow'}
    ,{id:	'RED'	,name: 'Red'}
    ,{id:	'R-S'	,name: 'Yellow'}
    ,{id:	'S'	,name: 'White'}
    ,{id:	'SLV'	,name: 'Silver'}
    ,{id:	'S-T'	,name: 'Yellow'}
    ,{id:	'T'	,name: 'White'}
    ,{id:	'TTLB'	,name: 'White'}
    ,{id:	'U'	,name: 'White'}
    ,{id:	'U-V'	,name: 'U-V Range'}
    ,{id:	'VLGT'	,name: 'Yellow'}
    ,{id:	'VLT'	,name: 'Violet'}
    ,{id:	'W'	,name: 'White'}
    ,{id:	'WHT'	,name: 'White'}
    ,{id:	'W-X'	,name: 'Yellow'}
    ,{id:	'X-W'	,name: 'X-W'}
    ,{id:	'X-Y'	,name: 'Yellow'}
    ,{id:	'Y'	,name: 'White'}
    ,{id:	'YEL'	,name: 'Yellow'}
    ,{id:	'YELW'	,name: 'Yellowish White'}
    ,{id:	'YELW-FCY'	,name: 'Yellowish White Fancy'}
    ,{id:	'YELW-FDEP'	,name: 'Yellowish White Fancy Deep'}
    ,{id:	'YELW-FDRK'	,name: 'Yellowish White Fancy Dark'}
    ,{id:	'YELW-FLGT'	,name: 'Yellowish White Fancy Light'}
    ,{id:	'YELW-LGT'	,name: 'Yellowish White Light'}
    ,{id:	'YLW'	,name: 'Yellow'}
    ,{id:	'Y-Z'	,name: 'Yellow'}
    ,{id:	'Z'	,name: 'White'}
  ],
  colorGrades:[
    {id: 0,name: 'Diamond White',disabled: true},
    {id: 1,name: 'D'},
    {id: 2,name: 'E'},
    {id: 3,name: 'F'},
    {id: 4,name: 'G'},
    {id: 5,name: 'H'},
    {id: 6,name: 'I'},
    {id: 7,name: 'J'},
    {id: 8,name: 'K'},
    {id: 9,name: 'L'},
    {id: 10,name: 'M'},
    {id: 11,name: 'N'},
    {id: 12,name: 'O'},
    {id: 13,name: 'P'},
    {id: 14,name: 'Q'},
    {id: 15,name: 'R'},
    {id: 16,name: 'S'},
    {id: 17,name: 'T'},
    {id: 18,name: 'U'},
    {id: 19,name: 'V'},
    {id: 20,name: 'W'},
    {id: 21,name: 'X'},
    {id: 22,name: 'Y'},
    {id: 23,name: 'Z'},
    {id: 24,name: 'TTLB'},
    {id: 251,name: 'Diamond Fancy',disabled: true},
    {id: 25,name: 'Faint'},
    {id: 26,name: 'Very Light'},
    {id: 27,name: 'Light'},
    {id: 28,name: 'Fancy Light'},
    {id: 29,name: 'Fancy'},
    {id: 30,name: 'Fancy Dark'},
    {id: 31,name: 'Fancy Intense'},
    {id: 32,name: 'Fancy Vivid'},
    {id: 33,name: 'Fancy Deep'},
    {id: 341,name: 'Fancy',disabled: true},
    {id: 34,name: 'Very Light'},
    {id: 35,name: 'Light'},
    {id: 36,name: 'Medium'},
    {id: 37,name: 'Intense'},
    {id: 38,name: 'Dark'}
  ],
  clarities:[
    {id: 'FL' ,name: 'FL'}
    ,{id: 'I1' ,name: 'I1'}
    ,{id: 'I1-I2' ,name: 'I1-I2'}
    ,{id: 'I1-I3' ,name: 'I1-I3'}
    ,{id: 'I2' ,name: 'I2'}
    ,{id: 'I3' ,name: 'I3'}
    ,{id: 'IF' ,name: 'IF'}
    ,{id: 'IF-VVS2' ,name: 'IF-VVS2'}
    ,{id: 'SI1' ,name: 'SI1'}
    ,{id: 'SI1-I1' ,name: 'SI1-I1'}
    ,{id: 'SI1-I2' ,name: 'SI1-I2'}
    ,{id: 'SI1-SI2' ,name: 'SI1-SI2'}
    ,{id: 'SI2' ,name: 'SI2'}
    ,{id: 'SI2-I1' ,name: 'SI2-I1'}
    ,{id: 'SI2-SI1' ,name: 'SI2-SI1'}
    ,{id: 'VS1' ,name: 'VS1'}
    ,{id: '-VS1' ,name: '-VS1'}
    ,{id: 'VS1-I1' ,name: 'VS1-I1'}
    ,{id: 'VS1-I3' ,name: 'VS1-I3'}
    ,{id: 'VS1-SI1' ,name: 'VS1-SI1'}
    ,{id: 'VS1-SI2' ,name: 'VS1-SI2'}
    ,{id: 'VS1-VS2' ,name: 'VS1-VS2'}
    ,{id: 'VS1-VVS2' ,name: 'VS1-VVS2'}
    ,{id: 'VS2' ,name: 'VS2'}
    ,{id: 'VS2-I1' ,name: 'VS2-I1'}
    ,{id: 'VS2-SI1' ,name: 'VS2-SI1'}
    ,{id: 'VS2-SI2' ,name: 'VS2-SI2'}
    ,{id: 'VS2-VS1' ,name: 'VS2-VS1'}
    ,{id: 'VVS1' ,name: 'VVS1'}
    ,{id: 'VVS1-I1' ,name: 'VVS1-I1'}
    ,{id: 'VVS1-SI1' ,name: 'VVS1-SI1'}
    ,{id: 'VVS1-SI2' ,name: 'VVS1-SI2'}
    ,{id: 'VVS1-VS1' ,name: 'VVS1-VS1'}
    ,{id: 'VVS1-VS2' ,name: 'VVS1-VS2'}
    ,{id: 'VVS1-VVS2' ,name: 'VVS1-VVS2'}
    ,{id: 'VVS2' ,name: 'VVS2'}
    ,{id: 'VVS2-SI1' ,name: 'VVS2-SI1'}
    ,{id: 'VVS2-SI2' ,name: 'VVS2-SI2'}
    ,{id: 'VVS2-VS2' ,name: 'VVS2-VS2'}
  ],
  certificateLabs: [
    {id: 'AGL' ,name: 'AGL'}
    ,{id: 'AIGS' ,name: 'AIGS'}
    ,{id: 'GIA' ,name: 'GIA'}
    ,{id: 'GIT' ,name: 'GIT'}
    ,{id: 'GRS' ,name: 'GRS'}
    ,{id: 'Gubelin' ,name: 'Gubelin'}
    ,{id: 'HRD' ,name: 'HRD'}
    ,{id: 'IGI' ,name: 'IGI'}
    ,{id: 'MOUAWAD' ,name: 'MOUAWAD'}
    ,{id: 'SSEF' ,name: 'SSEF'}
  ],
  polishs: [
    {id: 'Excellent' ,name: 'Excellent'}
    ,{id: 'VeryGood' ,name: 'VeryGood'}
    ,{id: 'Good' ,name: 'Good'}
    ,{id: 'Fair' ,name: 'Fair'}
    ,{id: 'Poor' ,name: 'Poor'}
  ],
  symmetries: [
    {id: 'Excellent' ,name: 'Excellent'}
    ,{id: 'VeryGood' ,name: 'VeryGood'}
    ,{id: 'Good' ,name: 'Good'}
    ,{id: 'Fair' ,name: 'Fair'}
    ,{id: 'Poor' ,name: 'Poor'}
  ],
  treatments: [
    {id: 'Amber' ,name: 'Amber'}
    ,{id: 'Beige' ,name: 'Beige'}
    ,{id: 'Black' ,name: 'Black'}
    ,{id: 'Blue' ,name: 'Blue'}
    ,{id: 'Bluish Green' ,name: 'Bluish Green'}
    ,{id: 'Bronze' ,name: 'Bronze'}
    ,{id: 'Brown' ,name: 'Brown'}
    ,{id: 'Brownish Red' ,name: 'Brownish Red'}
    ,{id: 'Cream' ,name: 'Cream'}
    ,{id: 'Fancy' ,name: 'Fancy'}
    ,{id: 'Gold' ,name: 'Gold'}
    ,{id: 'Gray' ,name: 'Gray'}
    ,{id: 'Green' ,name: 'Green'}
    ,{id: 'Orange' ,name: 'Orange'}
    ,{id: 'Pink' ,name: 'Pink'}
    ,{id: 'Purplish Pink' ,name: 'Purplish Pink'}
    ,{id: 'Purplish Red' ,name: 'Purplish Red'}
    ,{id: 'Red' ,name: 'Red'}
    ,{id: 'Remains' ,name: 'Remains'}
    ,{id: 'Silver' ,name: 'Silver'}
    ,{id: 'Violet' ,name: 'Violet'}
    ,{id: 'White' ,name: 'White'}
    ,{id: 'Yellow' ,name: 'Yellow'}
    ,{id: 'Yellow Green' ,name: 'Yellow Green'}
  ],
  fluorescences:[
    {id: 'Intense' ,name: 'Intense'}
    ,{id: 'Strong' ,name: 'Strong'}
    ,{id: 'Medium' ,name: 'Medium'}
    ,{id: 'Slight' ,name: 'Slight'}
  ],
  origins:[],
  // ----------------------------------
  jewelryCategories:[
    {id: 'A' ,name: 'A	[	Wedding Ring	]'}
    ,{id: 'ADC' ,name: 'ADC	[	Wedding Ring with a centre diamond	]'}
    ,{id: 'AM' ,name: 'AM	[	Wedding-Ring Manufactured	]'}
    ,{id: 'AQ' ,name: 'AQ	[	Wedding-Ring Semi-finished	]'}
    ,{id: 'AY' ,name: 'AY	[	Wedding-Ring	]'}
    ,{id: 'B' ,name: 'B	[	Bracelet	]'}
    ,{id: 'BD' ,name: 'BD	[	Bracelet for Lady\'s Watch	]'}
    ,{id: 'BDC' ,name: 'BDC	[	Bracelat with large centre diamond	]'}
    ,{id: 'BDQ' ,name: 'BDQ	[	Lady\'s Bracelet Semi-finished purchase	]'}
    ,{id: 'BDY' ,name: 'BDY	[	Bracelet for lady\'s watch con	]'}
    ,{id: 'BH' ,name: 'BH	[	Bracelet for Gent\'s Watch	]'}
    ,{id: 'BHQ' ,name: 'BHQ	[	Gent\'s Bracelet Semi-finished purchase	]'}
    ,{id: 'BM' ,name: 'BM	[	Bracelet Manufactured	]'}
    ,{id: 'BQ' ,name: 'BQ	[	BRACELET Semi-finished purchased	]'}
    ,{id: 'BY' ,name: 'BY	[	Bracelet on consignment with us(GOC)	]'}
    ,{id: 'C' ,name: 'C	[	Earrings	]'}
    ,{id: 'CDC' ,name: 'CDC	[	Earring with Large Center Stone	]'}
    ,{id: 'CDCY' ,name: 'CDCY	[	Earrings with Center Stone	]'}
    ,{id: 'CM' ,name: 'CM	[	Earring Manufactured	]'}
    ,{id: 'CQ' ,name: 'CQ	[	Earring Semi-finished purchase	]'}
    ,{id: 'CY' ,name: 'CY	[	Earings on consignment with us (GOC)	]'}
    ,{id: 'E' ,name: 'E	[	Set	]'}
    ,{id: 'EC' ,name: 'EC	[	Etampe	]'}
    ,{id: 'EMM' ,name: 'EMM	[	Set Manufactured	]'}
    ,{id: 'EQ' ,name: 'EQ	[	Set Semi-finished purchase	]'}
    ,{id: 'EY' ,name: 'EY	[	Set on consignment with us (GOC)	]'}
    ,{id: 'G' ,name: 'G	[	Prayer Beads	]'}
    ,{id: 'GM' ,name: 'GM	[	Prayer Beads Manufactured	]'}
    ,{id: 'GQ' ,name: 'GQ	[	Prayer Beads Semi finished purchased	]'}
    ,{id: 'GV' ,name: 'GV	[	Prayer Beads	]'}
    ,{id: 'J' ,name: 'J	[	GUINEA (an English gold coin)	]'}
    ,{id: 'M' ,name: 'M	[	Pendant	]'}
    ,{id: 'MDC' ,name: 'MDC	[	Pendant with large centre diamond	]'}
    ,{id: 'MDCY' ,name: 'MDCY	[	Pendant with Center Stone	]'}
    ,{id: 'MM' ,name: 'MM	[	Pendant Manufactured	]'}
    ,{id: 'MQ' ,name: 'MQ	[	Pendant Semi-finished purchase	]'}
    ,{id: 'MTB' ,name: 'MTB	[	Motif Bracelet	]'}
    ,{id: 'MY' ,name: 'MY	[	Pendant "Medallions" on consignment	]'}
    ,{id: 'N' ,name: 'N	[	Necklace	]'}
    ,{id: 'NDC' ,name: 'NDC	[	Necklace with large centre diamond	]'}
    ,{id: 'NM' ,name: 'NM	[	Necklace Manufactured	]'}
    ,{id: 'NQ' ,name: 'NQ	[	NECKLACE Semi-finished purchase	]'}
    ,{id: 'NY' ,name: 'NY	[	Necklace on consignment with us (GOC)	]'}
    ,{id: 'P' ,name: 'P	[	Cufflinks	]'}
    ,{id: 'PDC' ,name: 'PDC	[	Cufflinks with large centre diamond	]'}
    ,{id: 'PM' ,name: 'PM	[	Cufflinks Manufactured	]'}
    ,{id: 'PQ' ,name: 'PQ	[	Cufflink Semi-finished puchase	]'}
    ,{id: 'PV' ,name: 'PV	[	Cufflinks	]'}
    ,{id: 'PY' ,name: 'PY	[	Cufflinks on consignment with us (GOC)	]'}
    ,{id: 'R' ,name: 'R	[	Ladies Ring	]'}
    ,{id: 'RDC' ,name: 'RDC	[	Ring Diamond with a large stone diamond	]'}
    ,{id: 'RDCY' ,name: 'RDCY	[	Ladies ring with Center Stone	]'}
    ,{id: 'RM' ,name: 'RM	[	Ladies Ring Manufactured	]'}
    ,{id: 'RQ' ,name: 'RQ	[	Ladies Ringt Semi-finished purchase	]'}
    ,{id: 'RQY' ,name: 'RQY	[	Lady Ring SF on consignment with us (GOC)	]'}
    ,{id: 'RY' ,name: 'RY	[	Lady Ring on consignment with us (GOC)	]'}
    ,{id: 'T' ,name: 'T	[	Brooch	]'}
    ,{id: 'TDC' ,name: 'TDC	[	Brooch Diamond with a large stone	]'}
    ,{id: 'TM' ,name: 'TM	[	Brooch Manufactured	]'}
    ,{id: 'TQ' ,name: 'TQ	[	Brooch Semi-finished purchase	]'}
    ,{id: 'TY' ,name: 'TY	[	Brooch on consignment with us (GOC)	]'}
    ,{id: 'V' ,name: 'V	[	Gent\'s Ring	]'}
    ,{id: 'VDC' ,name: 'VDC	[	Gen\'s Ring  with a large stone	]'}
    ,{id: 'VM' ,name: 'VM	[	Gent\'s ring Manufactured	]'}
    ,{id: 'VQ' ,name: 'VQ	[	Gent\'s ring Semi-finished purchase	]'}
    ,{id: 'VY' ,name: 'VY	[	Gent\'s Ring on consignment with us (GOC)	]'}
    ,{id: 'GFK' ,name: 'GFK	[	Gift Key Holder	]'}
    ,{id: 'GFL' ,name: 'GFL	[	Gift Lighter	]'}
    ,{id: 'GFO' ,name: 'GFO	[	Gift Pen	]'}
    ,{id: 'Gift' ,name: 'Gift	[	Gift Jewelry	]'}
    ,{id: 'GiftACC' ,name: 'GiftACC	[	Gift Account	]'}
    ,{id: 'GiftOBA' ,name: 'GiftOBA	[	Gift Object Of Art	]'}
    ,{id: 'GiftPerf' ,name: 'GiftPerf	[	Gift Perfurm	]'}
    ,{id: 'GiftWAT' ,name: 'GiftWAT	[	Gift Watch	]'}
  ],
  collections:[
    {id: 'Adornment 1' ,name: 'Adornment 1'}
    ,{id: 'Adornment 2' ,name: 'Adornment 2'}
    ,{id: 'Animal World' ,name: 'Animal World'}
    ,{id: 'Aspen' ,name: 'Aspen'}
    ,{id: 'Baby Line' ,name: 'Baby Line'}
    ,{id: 'Big Bang' ,name: 'Big Bang'}
    ,{id: 'Bijou Divine' ,name: 'Bijou Divine'}
    ,{id: 'Business Card Holder' ,name: 'Business Card Holder'}
    ,{id: 'Charity' ,name: 'Charity'}
    ,{id: 'Charms' ,name: 'Charms'}
    ,{id: 'Chopardissimo' ,name: 'Chopardissimo'}
    ,{id: 'Classic Fusion' ,name: 'Classic Fusion'}
    ,{id: 'Classic Pearl' ,name: 'Classic Pearl'}
    ,{id: 'Clover' ,name: 'Clover'}
    ,{id: 'Cocktail Ring' ,name: 'Cocktail Ring'}
    ,{id: 'Coloured Diamond Classic' ,name: 'Coloured Diamond Classic'}
    ,{id: 'Copacabana' ,name: 'Copacabana'}
    ,{id: 'Croisette' ,name: 'Croisette'}
    ,{id: 'Cross' ,name: 'Cross'}
    ,{id: 'Delano' ,name: 'Delano'}
    ,{id: 'Diamond Classic' ,name: 'Diamond Classic'}
    ,{id: 'Diamond Scent' ,name: 'Diamond Scent'}
    ,{id: 'Diamond Scent 125th Anniversary' ,name: 'Diamond Scent 125th Anniversary'}
    ,{id: 'Diva' ,name: 'Diva'}
    ,{id: 'Eleanor' ,name: 'Eleanor'}
    ,{id: 'Engagement Ring' ,name: 'Engagement Ring'}
    ,{id: 'Fantasia' ,name: 'Fantasia'}
    ,{id: 'Flower of Eternity' ,name: 'Flower of Eternity'}
    ,{id: 'Gemstone Classic' ,name: 'Gemstone Classic'}
    ,{id: 'Geometric' ,name: 'Geometric'}
    ,{id: 'Glamour' ,name: 'Glamour'}
    ,{id: 'GOLDEN DIAMONDS' ,name: 'GOLDEN DIAMONDS'}
    ,{id: 'Grande Ellipse (Watch)' ,name: 'Grande Ellipse (Watch)'}
    ,{id: 'Grande Ellipse Accessories' ,name: 'Grande Ellipse Accessories'}
    ,{id: 'Haifa' ,name: 'Haifa'}
    ,{id: 'Haneen Kamel' ,name: 'Haneen Kamel'}
    ,{id: 'Happy Amore' ,name: 'Happy Amore'}
    ,{id: 'Happy Chopard' ,name: 'Happy Chopard'}
    ,{id: 'Happy Darling' ,name: 'Happy Darling'}
    ,{id: 'Happy Diamond' ,name: 'Happy Diamond'}
    ,{id: 'Happy Heart' ,name: 'Happy Heart'}
    ,{id: 'Happy Solitaire' ,name: 'Happy Solitaire'}
    ,{id: 'Happy Spirit' ,name: 'Happy Spirit'}
    ,{id: 'Happy Sport' ,name: 'Happy Sport'}
    ,{id: 'Happy Sport -  Happy Fish' ,name: 'Happy Sport -  Happy Fish'}
    ,{id: 'Happy Sun' ,name: 'Happy Sun'}
    ,{id: 'Heidi Klum' ,name: 'Heidi Klum'}
    ,{id: 'High Jewelry' ,name: 'High Jewelry'}
    ,{id: 'Hilal' ,name: 'Hilal'}
    ,{id: 'Hukom Ring Silver' ,name: 'Hukom Ring Silver'}
    ,{id: 'ICE CUBE' ,name: 'ICE CUBE'}
    ,{id: 'Imperial' ,name: 'Imperial'}
    ,{id: 'Imperiale' ,name: 'Imperiale'}
    ,{id: 'La Calssique' ,name: 'La Calssique'}
    ,{id: 'La Classique' ,name: 'La Classique'}
    ,{id: 'La Griffe' ,name: 'La Griffe'}
    ,{id: 'Lace' ,name: 'Lace'}
    ,{id: 'Lady Spike' ,name: 'Lady Spike'}
    ,{id: 'Larme D\'Amour' ,name: 'Larme D\'Amour'}
    ,{id: 'Lava' ,name: 'Lava'}
    ,{id: 'Le Coeur' ,name: 'Le Coeur'}
    ,{id: 'Leila' ,name: 'Leila'}
    ,{id: 'Love M' ,name: 'Love M'}
    ,{id: 'Masterpieces' ,name: 'Masterpieces'}
    ,{id: 'Melody' ,name: 'Melody'}
    ,{id: 'Micro Pave' ,name: 'Micro Pave'}
    ,{id: 'Misbaha' ,name: 'Misbaha'}
    ,{id: 'Mouawad Gemstones' ,name: 'Mouawad Gemstones'}
    ,{id: 'Mouawad Key Holder' ,name: 'Mouawad Key Holder'}
    ,{id: 'Mouawad Mural Wall Clock' ,name: 'Mouawad Mural Wall Clock'}
    ,{id: 'Mouawad Ties' ,name: 'Mouawad Ties'}
    ,{id: 'Oriana' ,name: 'Oriana'}
    ,{id: 'Other Classics' ,name: 'Other Classics'}
    ,{id: 'Papillon' ,name: 'Papillon'}
    ,{id: 'Peacock' ,name: 'Peacock'}
    ,{id: 'Perfume Mouawad Trigon' ,name: 'Perfume Mouawad Trigon'}
    ,{id: 'Q\'uranic' ,name: 'Q\'uranic'}
    ,{id: 'Rainbow' ,name: 'Rainbow'}
    ,{id: 'ROLO' ,name: 'ROLO'}
    ,{id: 'Rose Cut Classics' ,name: 'Rose Cut Classics'}
    ,{id: 'Rosette' ,name: 'Rosette'}
    ,{id: 'Rosette 125th Anniversary Gemstone Classic' ,name: 'Rosette 125th Anniversary Gemstone Classic'}
    ,{id: 'Royale Rings' ,name: 'Royale Rings'}
    ,{id: 'Sample Review' ,name: 'Sample Review'}
    ,{id: 'Shehrazad' ,name: 'Shehrazad'}
    ,{id: 'Silhouette' ,name: 'Silhouette'}
    ,{id: 'So Happy' ,name: 'So Happy'}
    ,{id: 'Sultan Rings' ,name: 'Sultan Rings'}
    ,{id: 'Tassel' ,name: 'Tassel'}
    ,{id: 'Touring' ,name: 'Touring'}
    ,{id: 'Trebor Jewelry' ,name: 'Trebor Jewelry'}
    ,{id: 'Trillium' ,name: 'Trillium'}
    ,{id: 'Verona' ,name: 'Verona'}
    ,{id: 'Versace Watches' ,name: 'Versace Watches'}
    ,{id: 'Vie' ,name: 'Vie'}
    ,{id: 'Wedding Band' ,name: 'Wedding Band'}
    ,{id: 'Wedding Collection' ,name: 'Wedding Collection'}
    ,{id: 'Xtravaganza' ,name: 'Xtravaganza'}
  ],
  brands:[
    {id: 'Accurist' ,name: 'Accurist'}
    ,{id: 'Alfred Dunhill' ,name: 'Alfred Dunhill'}
    ,{id: 'Aquanautic' ,name: 'Aquanautic'}
    ,{id: 'Aristo' ,name: 'Aristo'}
    ,{id: 'Arteluce' ,name: 'Arteluce'}
    ,{id: 'Audemars Piguet' ,name: 'Audemars Piguet'}
    ,{id: 'Basile' ,name: 'Basile'}
    ,{id: 'Baume & Mercier' ,name: 'Baume & Mercier'}
    ,{id: 'Beauty' ,name: 'Beauty'}
    ,{id: 'Bell & Ross' ,name: 'Bell & Ross'}
    ,{id: 'Besco' ,name: 'Besco'}
    ,{id: 'Blanc Pain' ,name: 'Blanc Pain'}
    ,{id: 'Breguet' ,name: 'Breguet'}
    ,{id: 'Bvlgari' ,name: 'Bvlgari'}
    ,{id: 'Calibri' ,name: 'Calibri'}
    ,{id: 'Carlo Ferrara' ,name: 'Carlo Ferrara'}
    ,{id: 'Cartier' ,name: 'Cartier'}
    ,{id: 'Carven' ,name: 'Carven'}
    ,{id: 'Catamaran' ,name: 'Catamaran'}
    ,{id: 'Charmex' ,name: 'Charmex'}
    ,{id: 'Chopard' ,name: 'Chopard'}
    ,{id: 'Corum' ,name: 'Corum'}
    ,{id: 'Curtis And Co' ,name: 'Curtis And Co'}
    ,{id: 'Cvstos' ,name: 'Cvstos'}
    ,{id: 'Daniel Carlino' ,name: 'Daniel Carlino'}
    ,{id: 'Daniel Roth' ,name: 'Daniel Roth'}
    ,{id: 'Delaneau' ,name: 'Delaneau'}
    ,{id: 'Dubey & Schaldenbrand' ,name: 'Dubey & Schaldenbrand'}
    ,{id: 'Dupont' ,name: 'Dupont'}
    ,{id: 'Ebel' ,name: 'Ebel'}
    ,{id: 'Enigma' ,name: 'Enigma'}
    ,{id: 'Forget' ,name: 'Forget'}
    ,{id: 'Fralpa' ,name: 'Fralpa'}
    ,{id: 'Frank Muller' ,name: 'Frank Muller'}
    ,{id: 'Geneve' ,name: 'Geneve'}
    ,{id: 'Gerald Genta' ,name: 'Gerald Genta'}
    ,{id: 'Girard Perregaux' ,name: 'Girard Perregaux'}
    ,{id: 'Graff' ,name: 'Graff'}
    ,{id: 'Grisogono' ,name: 'Grisogono'}
    ,{id: 'Hublot' ,name: 'Hublot'}
    ,{id: 'Ikepod' ,name: 'Ikepod'}
    ,{id: 'Jaeger Le Coultre' ,name: 'Jaeger Le Coultre'}
    ,{id: 'Japy' ,name: 'Japy'}
    ,{id: 'Jean D\'Eve' ,name: 'Jean D\'Eve'}
    ,{id: 'Jean Marcel' ,name: 'Jean Marcel'}
    ,{id: 'Jean Perret' ,name: 'Jean Perret'}
    ,{id: 'Jean Richard' ,name: 'Jean Richard'}
    ,{id: 'John Sterling' ,name: 'John Sterling'}
    ,{id: 'Jorg Hysek' ,name: 'Jorg Hysek'}
    ,{id: 'Juvenia' ,name: 'Juvenia'}
    ,{id: 'Kern' ,name: 'Kern'}
    ,{id: 'Kraus' ,name: 'Kraus'}
    ,{id: 'Le Marquand' ,name: 'Le Marquand'}
    ,{id: 'Le Roy' ,name: 'Le Roy'}
    ,{id: 'Linde Werdelin' ,name: 'Linde Werdelin'}
    ,{id: 'Longines' ,name: 'Longines'}
    ,{id: 'Louis Erard' ,name: 'Louis Erard'}
    ,{id: 'Lunette' ,name: 'Lunette'}
    ,{id: 'Makkah' ,name: 'Makkah'}
    ,{id: 'Martin Braun' ,name: 'Martin Braun'}
    ,{id: 'Memotime' ,name: 'Memotime'}
    ,{id: 'Michel Jordi' ,name: 'Michel Jordi'}
    ,{id: 'Microma' ,name: 'Microma'}
    ,{id: 'Milus' ,name: 'Milus'}
    ,{id: 'Montana' ,name: 'Montana'}
    ,{id: 'Montegrappa' ,name: 'Montegrappa'}
    ,{id: 'Mouawad' ,name: 'Mouawad'}
    ,{id: 'Movado' ,name: 'Movado'}
    ,{id: 'North Eagles' ,name: 'North Eagles'}
    ,{id: 'Omega' ,name: 'Omega'}
    ,{id: 'Orion' ,name: 'Orion'}
    ,{id: 'Parmigiani' ,name: 'Parmigiani'}
    ,{id: 'Pascal Vincent' ,name: 'Pascal Vincent'}
    ,{id: 'Patek Philippe' ,name: 'Patek Philippe'}
    ,{id: 'Paul Laurin' ,name: 'Paul Laurin'}
    ,{id: 'Paul Picot' ,name: 'Paul Picot'}
    ,{id: 'Piaget' ,name: 'Piaget'}
    ,{id: 'Pierre Kunz' ,name: 'Pierre Kunz'}
    ,{id: 'Repossi' ,name: 'Repossi'}
    ,{id: 'River' ,name: 'River'}
    ,{id: 'Roamer' ,name: 'Roamer'}
    ,{id: 'Roberge' ,name: 'Roberge'}
    ,{id: 'Roger Dubuis' ,name: 'Roger Dubuis'}
    ,{id: 'Rolex' ,name: 'Rolex'}
    ,{id: 'Sarcar' ,name: 'Sarcar'}
    ,{id: 'Schlegel & Plana' ,name: 'Schlegel & Plana'}
    ,{id: 'Seiko' ,name: 'Seiko'}
    ,{id: 'Sheaffer' ,name: 'Sheaffer'}
    ,{id: 'Sigma' ,name: 'Sigma'}
    ,{id: 'St. Moritz' ,name: 'St. Moritz'}
    ,{id: 'Storm' ,name: 'Storm'}
    ,{id: 'Swiss Army' ,name: 'Swiss Army'}
    ,{id: 'Tabbah' ,name: 'Tabbah'}
    ,{id: 'Technica' ,name: 'Technica'}
    ,{id: 'Thix' ,name: 'Thix'}
    ,{id: 'Thorr' ,name: 'Thorr'}
    ,{id: 'Time Chain' ,name: 'Time Chain'}
    ,{id: 'Trebor' ,name: 'Trebor'}
    ,{id: 'U-Boat' ,name: 'U-Boat'}
    ,{id: 'Ulysse Nardin' ,name: 'Ulysse Nardin'}
    ,{id: 'Urwerk' ,name: 'Urwerk'}
    ,{id: 'Vacheron Constantin' ,name: 'Vacheron Constantin'}
    ,{id: 'Valise' ,name: 'Valise'}
    ,{id: 'Van Cleef & Arpels' ,name: 'Van Cleef & Arpels'}
    ,{id: 'Versace Sa.' ,name: 'Versace Sa.'}
    ,{id: 'Vignando' ,name: 'Vignando'}
    ,{id: 'Visconti' ,name: 'Visconti'}
    ,{id: 'Vuarnet' ,name: 'Vuarnet'}
    ,{id: 'Wilsa' ,name: 'Wilsa'}
    ,{id: 'Yard-O-Led' ,name: 'Yard-O-Led'}
    ,{id: 'Yves Saint Blaise' ,name: 'Yves Saint Blaise'}
    ,{id: 'Zenith' ,name: 'Zenith'}
  ],
  ringSizes:[],
  dominantStones:[],
  metalTypes:[
    {id: 'ALUMINIUM' ,name: 'Aluminium'}
    ,{id: 'BRASS' ,name: 'Brass'}
    ,{id: 'CARBONFIBRE' ,name: 'Carbonfibre'}
    ,{id: 'GOLD' ,name: 'Gold'}
    ,{id: 'GOLD+STEEL' ,name: 'Gold+Steel'}
    ,{id: 'LEATHER' ,name: 'Leather'}
    ,{id: 'MIX' ,name: 'Mix'}
    ,{id: 'PALLADIUM' ,name: 'Palladium'}
    ,{id: 'PLATINUM' ,name: 'Platinum'}
    ,{id: 'PLATINUM+GOLD' ,name: 'Platinum+Gold'}
    ,{id: 'ROSEGOLD' ,name: 'Rosegold'}
    ,{id: 'RUBBER' ,name: 'Rubber'}
    ,{id: 'SILVER' ,name: 'Silver'}
    ,{id: 'STEEL' ,name: 'Steel'}
  ],
  metalColours:[
    {id: 'BI - COLOR' ,name: 'Bi+Color'}
    ,{id: 'BLACK' ,name: 'Black'}
    ,{id: 'BLUE' ,name: 'Blue'}
    ,{id: 'BROWN' ,name: 'Brown'}
    ,{id: 'GREEN' ,name: 'Green'}
    ,{id: 'MIX' ,name: 'Mix'}
    ,{id: 'PINK' ,name: 'Pink'}
    ,{id: 'RED' ,name: 'Red'}
    ,{id: 'ROSE' ,name: 'Rose'}
    ,{id: 'TRI+COLOR' ,name: 'Tri+Color'}
    ,{id: 'WHITE' ,name: 'White'}
    ,{id: 'WHITE+ROSE' ,name: 'White+Rose'}
    ,{id: 'WHITE+YELLOW' ,name: 'White+Yellow'}
    ,{id: 'YELLOW' ,name: 'Yellow'}
    ,{id: 'YELLOW+ROSE' ,name: 'Yellow+Rose'}
  ],
  certificateAgencys:[],
// ----------------------------------
  watchCategories:[
    {id: 'A' ,name: 'A	[	Wedding Ring	]'}
    ,{id: 'ADC' ,name: 'ADC	[	Wedding Ring with a centre diamond	]'}
    ,{id: 'AM' ,name: 'AM	[	Wedding-Ring Manufactured	]'}
    ,{id: 'AQ' ,name: 'AQ	[	Wedding-Ring Semi-finished	]'}
    ,{id: 'AY' ,name: 'AY	[	Wedding-Ring	]'}
    ,{id: 'B' ,name: 'B	[	Bracelet	]'}
    ,{id: 'BD' ,name: 'BD	[	Bracelet for Lady\'s Watch	]'}
    ,{id: 'BDC' ,name: 'BDC	[	Bracelat with large centre diamond	]'}
    ,{id: 'BDQ' ,name: 'BDQ	[	Lady\'s Bracelet Semi-finished purchase	]'}
    ,{id: 'BDY' ,name: 'BDY	[	Bracelet for lady\'s watch con	]'}
    ,{id: 'BH' ,name: 'BH	[	Bracelet for Gent\'s Watch	]'}
    ,{id: 'BHQ' ,name: 'BHQ	[	Gent\'s Bracelet Semi-finished purchase	]'}
    ,{id: 'BM' ,name: 'BM	[	Bracelet Manufactured	]'}
    ,{id: 'BQ' ,name: 'BQ	[	BRACELET Semi-finished purchased	]'}
    ,{id: 'BY' ,name: 'BY	[	Bracelet on consignment with us(GOC)	]'}
    ,{id: 'C' ,name: 'C	[	Earrings	]'}
    ,{id: 'CDC' ,name: 'CDC	[	Earring with Large Center Stone	]'}
    ,{id: 'CDCY' ,name: 'CDCY	[	Earrings with Center Stone	]'}
    ,{id: 'CM' ,name: 'CM	[	Earring Manufactured	]'}
    ,{id: 'CQ' ,name: 'CQ	[	Earring Semi-finished purchase	]'}
    ,{id: 'CY' ,name: 'CY	[	Earings on consignment with us (GOC)	]'}
    ,{id: 'E' ,name: 'E	[	Set	]'}
    ,{id: 'EC' ,name: 'EC	[	Etampe	]'}
    ,{id: 'EMM' ,name: 'EMM	[	Set Manufactured	]'}
    ,{id: 'EQ' ,name: 'EQ	[	Set Semi-finished purchase	]'}
    ,{id: 'EY' ,name: 'EY	[	Set on consignment with us (GOC)	]'}
    ,{id: 'G' ,name: 'G	[	Prayer Beads	]'}
    ,{id: 'GM' ,name: 'GM	[	Prayer Beads Manufactured	]'}
    ,{id: 'GQ' ,name: 'GQ	[	Prayer Beads Semi finished purchased	]'}
    ,{id: 'GV' ,name: 'GV	[	Prayer Beads	]'}
    ,{id: 'J' ,name: 'J	[	GUINEA (an English gold coin)	]'}
    ,{id: 'M' ,name: 'M	[	Pendant	]'}
    ,{id: 'MDC' ,name: 'MDC	[	Pendant with large centre diamond	]'}
    ,{id: 'MDCY' ,name: 'MDCY	[	Pendant with Center Stone	]'}
    ,{id: 'MM' ,name: 'MM	[	Pendant Manufactured	]'}
    ,{id: 'MQ' ,name: 'MQ	[	Pendant Semi-finished purchase	]'}
    ,{id: 'MTB' ,name: 'MTB	[	Motif Bracelet	]'}
    ,{id: 'MY' ,name: 'MY	[	Pendant "Medallions" on consignment	]'}
    ,{id: 'N' ,name: 'N	[	Necklace	]'}
    ,{id: 'NDC' ,name: 'NDC	[	Necklace with large centre diamond	]'}
    ,{id: 'NM' ,name: 'NM	[	Necklace Manufactured	]'}
    ,{id: 'NQ' ,name: 'NQ	[	NECKLACE Semi-finished purchase	]'}
    ,{id: 'NY' ,name: 'NY	[	Necklace on consignment with us (GOC)	]'}
    ,{id: 'P' ,name: 'P	[	Cufflinks	]'}
    ,{id: 'PDC' ,name: 'PDC	[	Cufflinks with large centre diamond	]'}
    ,{id: 'PM' ,name: 'PM	[	Cufflinks Manufactured	]'}
    ,{id: 'PQ' ,name: 'PQ	[	Cufflink Semi-finished puchase	]'}
    ,{id: 'PV' ,name: 'PV	[	Cufflinks	]'}
    ,{id: 'PY' ,name: 'PY	[	Cufflinks on consignment with us (GOC)	]'}
    ,{id: 'R' ,name: 'R	[	Ladies Ring	]'}
    ,{id: 'RDC' ,name: 'RDC	[	Ring Diamond with a large stone diamond	]'}
    ,{id: 'RDCY' ,name: 'RDCY	[	Ladies ring with Center Stone	]'}
    ,{id: 'RM' ,name: 'RM	[	Ladies Ring Manufactured	]'}
    ,{id: 'RQ' ,name: 'RQ	[	Ladies Ringt Semi-finished purchase	]'}
    ,{id: 'RQY' ,name: 'RQY	[	Lady Ring SF on consignment with us (GOC)	]'}
    ,{id: 'RY' ,name: 'RY	[	Lady Ring on consignment with us (GOC)	]'}
    ,{id: 'T' ,name: 'T	[	Brooch	]'}
    ,{id: 'TDC' ,name: 'TDC	[	Brooch Diamond with a large stone	]'}
    ,{id: 'TM' ,name: 'TM	[	Brooch Manufactured	]'}
    ,{id: 'TQ' ,name: 'TQ	[	Brooch Semi-finished purchase	]'}
    ,{id: 'TY' ,name: 'TY	[	Brooch on consignment with us (GOC)	]'}
    ,{id: 'V' ,name: 'V	[	Gent\'s Ring	]'}
    ,{id: 'VDC' ,name: 'VDC	[	Gen\'s Ring  with a large stone	]'}
    ,{id: 'VM' ,name: 'VM	[	Gent\'s ring Manufactured	]'}
    ,{id: 'VQ' ,name: 'VQ	[	Gent\'s ring Semi-finished purchase	]'}
    ,{id: 'VY' ,name: 'VY	[	Gent\'s Ring on consignment with us (GOC)	]'}
    ,{id: 'GFK' ,name: 'GFK	[	Gift Key Holder	]'}
    ,{id: 'GFL' ,name: 'GFL	[	Gift Lighter	]'}
    ,{id: 'GFO' ,name: 'GFO	[	Gift Pen	]'}
    ,{id: 'Gift' ,name: 'Gift	[	Gift Jewelry	]'}
    ,{id: 'GiftACC' ,name: 'GiftACC	[	Gift Account	]'}
    ,{id: 'GiftOBA' ,name: 'GiftOBA	[	Gift Object Of Art	]'}
    ,{id: 'GiftPerf' ,name: 'GiftPerf	[	Gift Perfurm	]'}
    ,{id: 'GiftWAT' ,name: 'GiftWAT	[	Gift Watch	]'}
  ],
  movements:[
    {id: 'ATM' ,name: 'ATM'}
    ,{id: 'MANL' ,name: 'MANL'}
    ,{id: 'MEC/ELR' ,name: 'MEC/ELR'}
    ,{id: 'MEC/SELF' ,name: 'MEC/SELF'}
    ,{id: 'QUAT' ,name: 'QUAT'}
    ,{id: 'SELF' ,name: 'SELF'}
    ,{id: 'SOL' ,name: 'SOL'}
  ],
  dialIndexs:[],
  dialColors:[
    {id: 'BLK' ,name: 'Black'}
    ,{id: 'BLK/WHT' ,name: 'Black & White'}
    ,{id: 'BLU' ,name: 'Blue'}
    ,{id: 'BRN' ,name: 'Brown'}
    ,{id: 'CHLT' ,name: 'Chocolate'}
    ,{id: 'CRM' ,name: 'Cream'}
    ,{id: 'GRY' ,name: 'Grey'}
    ,{id: 'ORN' ,name: 'Orange'}
    ,{id: 'PNK' ,name: 'Pink'}
    ,{id: 'RED' ,name: 'Red'}
    ,{id: 'SIL' ,name: 'Silver'}
    ,{id: 'WHT' ,name: 'White'}
    ,{id: 'YLW' ,name: 'Yellow'}
  ],
  dialMetals:[
    {id: 'Carbon' ,name: 'Carbon'}
    ,{id: 'Silver' ,name: 'Silver'}
    ,{id: 'White Gold' ,name: 'White Gold'}
    ,{id: 'Fiber' ,name: 'Fiber'}
    ,{id: 'Pink Gold' ,name: 'Pink Gold'}
    ,{id: 'Steel' ,name: 'Steel'}
    ,{id: 'Yellow Gold' ,name: 'Yellow Gold'}
    ,{id: 'Aluminium' ,name: 'Aluminium'}
    ,{id: 'Gemstone' ,name: 'Gemstone'}
    ,{id: 'MOP' ,name: 'MOP'}
    ,{id: 'Onix' ,name: 'Onix'}
    ,{id: 'Red Gold' ,name: 'Red Gold'}
    ,{id: 'Rose Gold' ,name: 'Rose Gold'}
  ],
  buckleTypes:[
    {id: 'Deployment' ,name: 'Deployment'}
    ,{id: 'Simple' ,name: 'Simple'}
  ],
  strapTypes:[
    {id: 'ALUM' ,name: 'Aluminium'}
    ,{id: 'JENS' ,name: 'Jeans'}
    ,{id: 'LETH' ,name: 'Leather'}
    ,{id: 'NYON' ,name: 'Nylon'}
    ,{id: 'PLST' ,name: 'Plastic'}
    ,{id: 'RUBR' ,name: 'Rubber'}
    ,{id: 'SAIN' ,name: 'Satin'}
    ,{id: 'STL' ,name: 'Steel'}
    ,{id: 'STL/RG' ,name: 'Steel-R/G'}
    ,{id: 'STL/WG' ,name: 'Steel-W/G'}
    ,{id: 'TIT/STL' ,name: 'Titan-Steel'}
    ,{id: 'TITAN' ,name: 'Titanium'}
    ,{id: 'WHTGLD' ,name: 'White Gold'}
    ,{id: 'YELGLD' ,name: 'Yellow Gold'}
  ],
  strapColors:[
    {id: 'Black' ,name: 'Black'}
    ,{id: 'Blue' ,name: 'Blue'}
    ,{id: 'Brown' ,name: 'Brown'}
    ,{id: 'Fuchsia' ,name: 'Fuchsia'}
    ,{id: 'Gray' ,name: 'Gray'}
    ,{id: 'Red' ,name: 'Red'}
    ,{id: 'White' ,name: 'White'}
  ],
  complications:[
    {id: 'CHRG' ,name: 'CHRG'}
    ,{id: 'CHRM' ,name: 'CHRM'}
    ,{id: 'WATR' ,name: 'WATR'}
  ]
};
