const sleep = (val) => new Promise((res) => setTimeout(() => res(val), 3000));

sleep("Olá marilene").then((res) => console.log(res));
