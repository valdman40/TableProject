export interface TableData {
  id: string;
  name: string;
  age: number;
  city: string;
  email: string;
  children?: TableData[];
}

export const dummyData: TableData[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    age: 30, 
    city: 'New York', 
    email: 'john@example.com',
    children: [
      { 
        id: '1-1', 
        name: 'John Jr.', 
        age: 8, 
        city: 'New York', 
        email: 'johnjr@example.com',
        children: [
          { id: '1-1-1', name: 'Little Johnny', age: 2, city: 'New York', email: 'littlejohnny@example.com' },
        ]
      },
      { id: '1-2', name: 'Sarah Doe', age: 6, city: 'New York', email: 'sarah.doe@example.com' },
    ]
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    age: 25, 
    city: 'Los Angeles', 
    email: 'jane@example.com',
    children: [
      { id: '2-1', name: 'Emma Smith', age: 4, city: 'Los Angeles', email: 'emma@example.com' },
    ]
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    age: 35, 
    city: 'Chicago', 
    email: 'bob@example.com',
    children: [
      { 
        id: '3-1', 
        name: 'Mike Johnson', 
        age: 12, 
        city: 'Chicago', 
        email: 'mike@example.com',
        children: [
          { id: '3-1-1', name: 'Tiny Mike', age: 1, city: 'Chicago', email: 'tinymike@example.com' },
        ]
      },
      { id: '3-2', name: 'Lisa Johnson', age: 10, city: 'Chicago', email: 'lisa@example.com' },
      { id: '3-3', name: 'Tom Johnson', age: 7, city: 'Chicago', email: 'tom@example.com' },
    ]
  },
  { id: '4', name: 'Alice Brown', age: 28, city: 'Houston', email: 'alice@example.com' },
  { 
    id: '5', 
    name: 'Charlie Wilson', 
    age: 42, 
    city: 'Phoenix', 
    email: 'charlie@example.com',
    children: [
      { id: '5-1', name: 'Alex Wilson', age: 15, city: 'Phoenix', email: 'alex@example.com' },
      { 
        id: '5-2', 
        name: 'Beth Wilson', 
        age: 13, 
        city: 'Phoenix', 
        email: 'beth@example.com',
        children: [
          { id: '5-2-1', name: 'Baby Beth', age: 0, city: 'Phoenix', email: 'babybeth@example.com' },
        ]
      },
    ]
  },
  { id: '6', name: 'Diana Davis', age: 33, city: 'Philadelphia', email: 'diana@example.com' },
  { 
    id: '7', 
    name: 'Michael Garcia', 
    age: 39, 
    city: 'San Antonio', 
    email: 'michael@example.com',
    children: [
      { id: '7-1', name: 'Sofia Garcia', age: 11, city: 'San Antonio', email: 'sofia@example.com' },
    ]
  },
  { id: '8', name: 'Sarah Miller', age: 27, city: 'San Diego', email: 'sarah@example.com' },
  { id: '9', name: 'David Rodriguez', age: 31, city: 'Dallas', email: 'david@example.com' },
  { id: '10', name: 'Emily Martinez', age: 29, city: 'San Jose', email: 'emily@example.com' },
];
