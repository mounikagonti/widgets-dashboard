import {Category} from '../types'

export const initialData: {categories: Category[]} = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM',
      widgets: [
        {id: 1, name: 'Cloud Accounts', content: 'Random text for Widget 1'},
        {
          id: 2,
          name: 'Cloud Account Risk Assessment',
          content: 'Random text for Widget 2',
        },
      ],
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP',
      widgets: [
        {
          id: 1,
          name: 'Top 5 Namespace Specific Alerts',
          content: 'Random text for Widget 1',
        },
        {
          id: 2,
          name: 'Workload Alerts',
          content: 'Random text for Widget 1',
        },
      ],
    },
    {
      id: 'registry-scan',
      name: 'Image',
      widgets: [
        {
          id: 1,
          name: 'Image Risk Management',
          content: 'Random text for Widget 1',
        },
        {
          id: 2,
          name: 'Image Security Issues',
          content: 'Random text for Widget 1',
        },
      ],
    },
    {
      id: 'ticket',
      name: 'Ticket',
      widgets: [
        {id: 1, name: 'Ticket 1', content: 'Random text for Widget 1'},
        {id: 1, name: 'Ticket 1', content: 'Random text for Widget 1'},
      ],
    },
  ],
}
