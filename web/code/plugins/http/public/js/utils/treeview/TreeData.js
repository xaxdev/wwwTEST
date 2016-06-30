module.exports = [
	{id:'A', label: 'A', },
  {id:'B',label: 'B'},
  {id:'C',label: 'C',
    children: [
        {id:'C-A',label: 'C-A'},
        {id:'C-B',label: 'C-B',},
        {id:'C-C',label: 'C-C',
          children: [
              {id:'C-C-A',label: 'C-C-A'},
              {id:'C-C-B',label: 'C-C-B'},
              {id:'C-C-C',label: 'C-C-C', }
          ]
        }
    ]
  },
  {id:'D',label: 'D'}
];
