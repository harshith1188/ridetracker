export  const calculateLastRide=(skm:number,ekm:number,amount:number,petrol:number,mileage:number)=>{
    let totalDistance=ekm-skm;

    let fuelUsed=totalDistance/mileage;
    let fuelCost=fuelUsed*petrol;
    let profit=amount-fuelCost;

    return{ totalDistance,amount,profit,fuelCost,fuelUsed}
}



export const getTodayRides = (rides: any[]) => {
    const today = new Date();//getting tdys date

    return rides.filter((ride) => {
        const rideDate = new Date(ride.stime);//getting  the date of  the ride 

        return (
            rideDate.getDate() === today.getDate() &&
            rideDate.getMonth() === today.getMonth() &&
            rideDate.getFullYear() === today.getFullYear()
        );
    });
};


export const getYesterdayRides = (rides: any[]) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return rides.filter((ride) => {
        const rideDate = new Date(ride.stime);

        return (
            rideDate.getDate() === yesterday.getDate() &&
            rideDate.getMonth() === yesterday.getMonth() &&
            rideDate.getFullYear() === yesterday.getFullYear()
        );
    });
};


export const getTodayPetrol = (rides: any[]) => {
    const today = new Date();//getting tdys date

    return rides.filter((ride) => {
        const rideDate = new Date(ride.date);//getting  the date of  the petrol 

        return (
            rideDate.getDate() === today.getDate() &&
            rideDate.getMonth() === today.getMonth() &&
            rideDate.getFullYear() === today.getFullYear()
        );
    });
};

export const getYesterdayPetrol = (rides: any[]) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return rides.filter((ride) => {
        const rideDate = new Date(ride.date);
        console.log("Stored:", ride.date);
        console.log("Parsed:", rideDate);
        console.log("Is Valid:", !isNaN(rideDate.getTime()));

        return (
            rideDate.getDate() === yesterday.getDate() &&
            rideDate.getMonth() === yesterday.getMonth() &&
            rideDate.getFullYear() === yesterday.getFullYear()
        );
    });
};


// this  month 
export const getThisMonth = (History: any[]) => {
  const today = new Date();

  return History.filter((item) => {
    const date = new Date(item.date);

    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });
};


// last month
export const getLastMonth = (History: any[]) => {
  const today = new Date();

  let month = today.getMonth() - 1;
  let year = today.getFullYear();

  // Handle January
  if (month < 0) {
    month = 11;
    year--;
  }

  return History.filter((item) => {
    const date = new Date(item.date);

    return (
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  });
};


// this  week
export const getThisWeek = (History: any[]) => {
  const today = new Date();

  // Start of the week (Monday)
  const startOfWeek = new Date(today);

  const day = today.getDay(); // Sunday = 0, Monday = 1, ...
  const diff = day === 0 ? 6 : day - 1;

  startOfWeek.setDate(today.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  return History.filter((item) => {
    const date = new Date(item.date);

    return date >= startOfWeek && date <= today;
  });
};