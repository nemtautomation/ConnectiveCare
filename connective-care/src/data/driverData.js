export const drivers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: 'a.jpg',
    companyName: 'ABC Taxi',
    idNumber: '12345',
    address: 'University Hospital, 150 Bergen Street',
    city: 'Newark',
    state: 'NJ'
  },
  {
    id: 2,
    firstName: 'Alice',
    lastName: 'Johnson',
    profilePicture: 'b.jpg',
    companyName: 'XYZ Rides',
    idNumber: '67890',
    address: '374 Park Avenue, Elm Park Village',
    city: 'East Orange',
    state: 'NJ'
  }
  ];
  
  export const driverAides = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      profilePicture: 'c.jpg',
      companyName: 'ABC Taxi',
      idNumber: '54321',
      address: '1 Main Street',
      city: 'Newark',
      state: 'NJ'
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Johnson',
      profilePicture: 'd.jpg',
      companyName: 'XYZ Rides',
      idNumber: '09876',
      address: '10 Fake Road',
      city: 'Brooklyn',
      state: 'NY'
    },
  ];
  
  export const displayAllDrivers = (drivers) => {
    console.log("All Drivers:");
    drivers.forEach(driver => {
      console.log(`
        Name: ${driver.firstName} ${driver.lastName}
        Company: ${driver.companyName}
        ID: ${driver.idNumber}
      `);
    });
  };
  
  export const filterDriversByCompany = (companyName) => {
    return drivers.filter(driver => driver.companyName === companyName);
  };
  
  export const filterDriverAidesByCompany = (companyName) => {
    return driverAides.filter(driverAide => driverAide.companyName === companyName);
  };
  