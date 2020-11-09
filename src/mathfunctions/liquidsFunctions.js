import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
var moment = require("moment");

export const CountStartDensity = (routes, liquid) => {
  let liquidRoutes = routes.filter((route) => route.liquidName === liquid.name);
  let dansitiesArray = liquidRoutes.map((route) => {
    return route.density;
  });
  return dansitiesArray;
};

export const ExportReactCSV = ({ csvData, fileName, textCSV }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <button
      onClick={(e) => exportToCSV(csvData, fileName)}
      className="btn btn-success createExelBtn"
    >
      <small>{textCSV}</small>
    </button>
  );
};

export const CommonLiquidsCount = (routes, cars) => {
  let commonListLiquids = [];
  let listLiquids = [];
  if (!routes) {
    routes = [];
  }
  cars.map((car) => {
    let carRoutes = routes.filter((route) => route.listOwner === car.id);
    let carListLiquids = NewListLiquidsCount(carRoutes);
    commonListLiquids = commonListLiquids.concat(carListLiquids);
    return car;
  });
  commonListLiquids.map((liquid) => {
    let balanceStart = 0;
    let received = 0;
    let expended = 0;
    let balanceFinish = 0;
    let existLiquid = !!listLiquids.filter((liq) => liq.name === liquid.name)
      .length;
    if (!existLiquid) {
      balanceStart =
        parseInt((balanceStart + Number(liquid.balanceStart)) * 100, 10) / 100;
      received = parseInt((received + Number(liquid.received)) * 100, 10) / 100;
      expended = parseInt((expended + Number(liquid.expended)) * 100, 10) / 100;
      balanceFinish =
        parseInt((balanceFinish + Number(liquid.balanceFinish)) * 100, 10) /
        100;
      let Liquid = {
        name: liquid.name,
        balanceStart: balanceStart,
        received: received,
        expended: expended,
        balanceFinish: balanceFinish,
      };
      listLiquids = listLiquids.concat([Liquid]);
    } else {
      let modifyLiquid = listLiquids
        .filter((liq) => liq.name === liquid.name)
        .shift();
      let modifyLiquidList = listLiquids.filter(
        (liq) => liq.name !== liquid.name
      );
      balanceStart =
        parseInt(
          (Number(modifyLiquid.balanceStart) + Number(liquid.balanceStart)) *
            100,
          10
        ) / 100;
      received =
        parseInt(
          (Number(modifyLiquid.received) + Number(liquid.received)) * 100,
          10
        ) / 100;
      expended =
        parseInt(
          (Number(modifyLiquid.expended) + Number(liquid.expended)) * 100,
          10
        ) / 100;
      balanceFinish =
        parseInt(
          (Number(modifyLiquid.balanceFinish) + Number(liquid.balanceFinish)) *
            100,
          10
        ) / 100;
      let Liquid = {
        name: liquid.name,
        balanceStart: balanceStart,
        received: received,
        expended: expended,
        balanceFinish: balanceFinish,
      };
      listLiquids = modifyLiquidList.concat([Liquid]);
    }
    return liquid;
  });
  listLiquids.sort((a, b) => a.name - b.name);
  return listLiquids;
};

export const carLiquidsExelInfo = (cars, lists, routes) => {
  let newCarLiquidsInfo = [];
  cars.map((car) => {
    let newLists = lists.filter((list) => list.listOwner === car.id);
    newLists.sort((a, b) => a.listNumber - b.listNumber);
    let carRoutes = routes.filter((route) => route.listOwner === car.id);
    let listCarLiquids = NewListLiquidsCount(carRoutes);
    let newCarLiquidNull = {
      Найменування: car.typeOfCar,
      Номер: car.governmentCarNumber,
      "Тип ПММ": "---",
      Було: "---",
      Отримано: "---",
      Витрачено: "---",
      Залишок: "---",
    };
    newCarLiquidsInfo = newCarLiquidsInfo.concat(newCarLiquidNull);
    let newCarLiquid = {};
    listCarLiquids.map((liq) => {
      newCarLiquid = {
        Найменування: "",
        Номер: "",
        "Тип ПММ": liq.name,
        Було: liq.balanceStart,
        Отримано: liq.received,
        Витрачено: liq.expended,
        Залишок: liq.balanceFinish,
      };
      newCarLiquidsInfo = newCarLiquidsInfo.concat(newCarLiquid);
      return liq;
    });
    return car;
  });
  return newCarLiquidsInfo;
};

export const carListLiquidsExelInfo = (cars, lists, routes) => {
  let newCarListLiquidsInfo = [];
  cars.map((car) => {
    let newLists = lists.filter((list) => list.listOwner === car.id);
    newLists.sort((a, b) => a.listNumber - b.listNumber);
    let newCarListLiquidNull_Car = {
      Номер: car.governmentCarNumber,
      "Лист №": "---",
      "Тип ПММ": "---",
      Було: "---",
      Отримано: "---",
      Витрачено: "---",
      Залишок: "---",
    };
    newCarListLiquidsInfo = newCarListLiquidsInfo.concat(
      newCarListLiquidNull_Car
    );
    newLists.map((list) => {
      let newCarListLiquidNull_List = {
        Номер: "---",
        "Лист №": list.listNumber,
        "Тип ПММ": "---",
        Було: "---",
        Отримано: "---",
        Витрачено: "---",
        Залишок: "---",
      };
      newCarListLiquidsInfo = newCarListLiquidsInfo.concat(
        newCarListLiquidNull_List
      );
      let listRoutes = routes.filter((route) => route.routeOwner === list.id);
      let listListLiquids = NewListLiquidsCount(listRoutes);
      let newCarListLiquid = {};
      listListLiquids.map((liq) => {
        newCarListLiquid = {
          Номер: "---",
          "Лист №": "---",
          "Тип ПММ": liq.name,
          Було: liq.balanceStart,
          Отримано: liq.received,
          Витрачено: liq.expended,
          Залишок: liq.balanceFinish,
        };
        newCarListLiquidsInfo = newCarListLiquidsInfo.concat(newCarListLiquid);
        return liq;
      });
      return list;
    });
    return car;
  });
  return newCarListLiquidsInfo;
};

export const carExelInfo = (cars) => {
  let commonCarsInfo = [];
  cars.map((car) => {
    let TO2 =
      parseInt(
        (Number(car.carIndicatorLastTO2) + Number(car.routeToTO2)) * 100,
        10
      ) / 100;
    let routeToTO2 =
      parseInt(
        (Number(car.carIndicatorLastTO2) +
          Number(car.routeToTO2) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let TO1 =
      parseInt(
        (Number(car.carIndicatorLastTO1) + Number(car.routeToTO1)) * 100,
        10
      ) / 100;
    let routeToTO1 =
      parseInt(
        (Number(car.carIndicatorLastTO1) +
          Number(car.routeToTO1) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let КР =
      parseInt(
        (Number(car.carIndicatorLastКР) + Number(car.routeToКР)) * 100,
        10
      ) / 100;
    let routeToКР =
      parseInt(
        (Number(car.carIndicatorLastКР) +
          Number(car.routeToКР) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let СР =
      parseInt(
        (Number(car.carIndicatorLastСР) + Number(car.routeToСР)) * 100,
        10
      ) / 100;
    let routeToСР =
      parseInt(
        (Number(car.carIndicatorLastСР) +
          Number(car.routeToСР) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    commonCarsInfo = commonCarsInfo.concat({
      "Найменув.": car.typeOfCar,
      Номер: car.governmentCarNumber,
      Пробіг: car.carIndicatorLast,
      Км: car.totalCarMileage,
      "Напрац.": car.carTimeFinish,
      Год: car.carTimeTotal,
      "На дату": moment(car.dateOfRegistration).format("DD.MM HH:mm"),
      "№ двиг.": car.carEngineNumber,
      "№ шасі": car.factoryCarNumber,
      "№ пасп.": car.factoryCarNumber,
      "Обладн.": car.specialCarEquipment,
      "№ обл.": car.specialCarEquipmentNumber,
      Власник: car.carOwnerName,
      Вироблено: car.dateOfCarProduction,
      Група: car.operatingGroup,
      Категорія: car.category,
      TO1: TO1,
      "До ТО1": routeToTO1,
      TO2: TO2,
      "До ТО2": routeToTO2,
      СР: СР,
      "До СР": routeToСР,
      КР: КР,
      "До КР": routeToКР,
      Стан: car.serviceabilityreason,
    });
    return car;
  });
  return commonCarsInfo;
};

export const agrExelInfo = (cars) => {
  let commonCarsInfo = [];
  cars.map((car) => {
    let timeTO2 =
      parseInt(
        (Number(car.carTimeLastTO2) + Number(car.nextTimeTO2)) * 100,
        10
      ) / 100;
    let timeToTO2 =
      parseInt(
        (Number(car.carTimeLastTO2) +
          Number(car.nextTimeTO2) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeTO1 =
      parseInt(
        (Number(car.carTimeLastTO1) + Number(car.nextTimeTO1)) * 100,
        10
      ) / 100;
    let timeToTO1 =
      parseInt(
        (Number(car.carTimeLastTO1) +
          Number(car.nextTimeTO1) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeКР =
      parseInt((Number(car.carTimeLastКР) + Number(car.nextTimeКР)) * 100, 10) /
      100;
    let timeToКР =
      parseInt(
        (Number(car.carTimeLastКР) +
          Number(car.nextTimeКР) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeСР =
      parseInt((Number(car.carTimeLastСР) + Number(car.nextTimeСР)) * 100, 10) /
      100;
    let timeToСР =
      parseInt(
        (Number(car.carTimeLastСР) +
          Number(car.nextTimeСР) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    commonCarsInfo = commonCarsInfo.concat({
      "Найменув.": car.typeOfCar,
      Номер: car.governmentCarNumber,
      Пробіг: car.carIndicatorLast,
      Км: car.totalCarMileage,
      "Напрац.": car.carTimeFinish,
      Год: car.carTimeTotal,
      "На дату": moment(car.dateOfRegistration).format("DD.MM HH:mm"),
      "№ двиг.": car.carEngineNumber,
      "№ шасі": car.factoryCarNumber,
      "№ пасп.": car.factoryCarNumber,
      "Обладн.": car.specialCarEquipment,
      "№ обл.": car.specialCarEquipmentNumber,
      Власник: car.carOwnerName,
      Вироблено: car.dateOfCarProduction,
      Група: car.operatingGroup,
      Категорія: car.category,
      "Час ТО1": timeTO1,
      "Час до ТО1": timeToTO1,
      "Час ТО2": timeTO2,
      "Час до ТО2": timeToTO2,
      "Час СР": timeСР,
      "Час до СР": timeToСР,
      "Час КР": timeКР,
      "Час до КР": timeToКР,
      Стан: car.serviceabilityreason,
    });
    return car;
  });
  return commonCarsInfo;
};

export const agrCarExelInfo = (cars) => {
  let commonCarsInfo = [];
  cars.map((car) => {
    let TO2 =
      parseInt(
        (Number(car.carIndicatorLastTO2) + Number(car.routeToTO2)) * 100,
        10
      ) / 100;
    let routeToTO2 =
      parseInt(
        (Number(car.carIndicatorLastTO2) +
          Number(car.routeToTO2) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let TO1 =
      parseInt(
        (Number(car.carIndicatorLastTO1) + Number(car.routeToTO1)) * 100,
        10
      ) / 100;
    let routeToTO1 =
      parseInt(
        (Number(car.carIndicatorLastTO1) +
          Number(car.routeToTO1) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let timeTO2 =
      parseInt(
        (Number(car.carTimeLastTO2) + Number(car.nextTimeTO2)) * 100,
        10
      ) / 100;
    let timeToTO2 =
      parseInt(
        (Number(car.carTimeLastTO2) +
          Number(car.nextTimeTO2) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeTO1 =
      parseInt(
        (Number(car.carTimeLastTO1) + Number(car.nextTimeTO1)) * 100,
        10
      ) / 100;
    let timeToTO1 =
      parseInt(
        (Number(car.carTimeLastTO1) +
          Number(car.nextTimeTO1) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let КР =
      parseInt(
        (Number(car.carIndicatorLastКР) + Number(car.routeToКР)) * 100,
        10
      ) / 100;
    let routeToКР =
      parseInt(
        (Number(car.carIndicatorLastКР) +
          Number(car.routeToКР) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let СР =
      parseInt(
        (Number(car.carIndicatorLastСР) + Number(car.routeToСР)) * 100,
        10
      ) / 100;
    let routeToСР =
      parseInt(
        (Number(car.carIndicatorLastСР) +
          Number(car.routeToСР) -
          Number(car.carIndicatorLast)) *
          100,
        10
      ) / 100;
    let timeКР =
      parseInt((Number(car.carTimeLastКР) + Number(car.nextTimeКР)) * 100, 10) /
      100;
    let timeToКР =
      parseInt(
        (Number(car.carTimeLastКР) +
          Number(car.nextTimeКР) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeСР =
      parseInt((Number(car.carTimeLastСР) + Number(car.nextTimeСР)) * 100, 10) /
      100;
    let timeToСР =
      parseInt(
        (Number(car.carTimeLastСР) +
          Number(car.nextTimeСР) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    commonCarsInfo = commonCarsInfo.concat({
      "Найменув.": car.typeOfCar,
      Номер: car.governmentCarNumber,
      Пробіг: car.carIndicatorLast,
      Км: car.totalCarMileage,
      "Напрац.": car.carTimeFinish,
      Год: car.carTimeTotal,
      "На дату": moment(car.dateOfRegistration).format("DD.MM HH:mm"),
      "№ двиг.": car.carEngineNumber,
      "№ шасі": car.factoryCarNumber,
      "№ пасп.": car.factoryCarNumber,
      "Обладн.": car.specialCarEquipment,
      "№ обл.": car.specialCarEquipmentNumber,
      Власник: car.carOwnerName,
      Вироблено: car.dateOfCarProduction,
      Група: car.operatingGroup,
      Категорія: car.category,
      TO1: TO1,
      "До ТО1": routeToTO1,
      TO2: TO2,
      "До ТО2": routeToTO2,
      СР: СР,
      "До СР": routeToСР,
      КР: КР,
      "До КР": routeToКР,
      "Час ТО1": timeTO1,
      "Час до ТО1": timeToTO1,
      "Час ТО2": timeTO2,
      "Час до ТО2": timeToTO2,
      "Час СР": timeСР,
      "Час до СР": timeToСР,
      "Час КР": timeКР,
      "Час до КР": timeToКР,
      Стан: car.serviceabilityreason,
    });
    return car;
  });
  return commonCarsInfo;
};

export const instExelInfo = (cars) => {
  let commonCarsInfo = [];
  cars.map((car) => {
    let timeTO2 =
      parseInt(
        (Number(car.carTimeLastTO2) + Number(car.nextTimeTO2)) * 100,
        10
      ) / 100;
    let timeToTO2 =
      parseInt(
        (Number(car.carTimeLastTO2) +
          Number(car.nextTimeTO2) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeTO1 =
      parseInt(
        (Number(car.carTimeLastTO1) + Number(car.nextTimeTO1)) * 100,
        10
      ) / 100;
    let timeToTO1 =
      parseInt(
        (Number(car.carTimeLastTO1) +
          Number(car.nextTimeTO1) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeКР =
      parseInt((Number(car.carTimeLastКР) + Number(car.nextTimeКР)) * 100, 10) /
      100;
    let timeToКР =
      parseInt(
        (Number(car.carTimeLastКР) +
          Number(car.nextTimeКР) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    let timeСР =
      parseInt((Number(car.carTimeLastСР) + Number(car.nextTimeСР)) * 100, 10) /
      100;
    let timeToСР =
      parseInt(
        (Number(car.carTimeLastСР) +
          Number(car.nextTimeСР) -
          Number(car.carTimeFinish)) *
          100,
        10
      ) / 100;
    commonCarsInfo = commonCarsInfo.concat({
      "Найменув.": car.typeOfCar,
      Номер: car.governmentCarNumber,
      Пробіг: car.carIndicatorLast,
      Км: car.totalCarMileage,
      "Напрац.": car.carTimeFinish,
      Год: car.carTimeTotal,
      "На дату": moment(car.dateOfRegistration).format("DD.MM HH:mm"),
      "№ двиг.": car.carEngineNumber,
      "№ шасі": car.factoryCarNumber,
      "№ пасп.": car.factoryCarNumber,
      "Обладн.": car.specialCarEquipment,
      "№ обл.": car.specialCarEquipmentNumber,
      Власник: car.carOwnerName,
      Вироблено: car.dateOfCarProduction,
      Група: car.operatingGroup,
      Категорія: car.category,
      "Час ТО1": timeTO1,
      "Час до ТО1": timeToTO1,
      "Час ТО2": timeTO2,
      "Час до ТО2": timeToTO2,
      "Час СР": timeСР,
      "Час до СР": timeToСР,
      "Час КР": timeКР,
      "Час до КР": timeToКР,
      Стан: car.serviceabilityreason,
    });
    return car;
  });
  return commonCarsInfo;
};

export const instTimeExelInfo = (cars, lists, routes) => {
  let newCarListTimesInfo = [];
  cars.map((car) => {
    let newLists = lists.filter((list) => list.listOwner === car.id);
    newLists.sort((a, b) => a.listNumber - b.listNumber);
    let newCarListLiquidNull_Car = {
      Назва: car.typeOfCar,
      Номер: car.governmentCarNumber,
      "Лист №": "---",
      Годин: "---",
      "Час початку": "---",
      "Час закінчення": "---",
      Мета: "---",
      Зауваження: "---",
    };
    newCarListTimesInfo = newCarListTimesInfo.concat(newCarListLiquidNull_Car);
    newLists.map((list) => {
      let newCarListLiquidNull_List = {
        Назва: "---",
        Номер: "---",
        "Лист №": list.listNumber,
        Годин: "---",
        "Час початку": "---",
        "Час закінчення": "---",
        Мета: "---",
        Зауваження: "---",
      };
      newCarListTimesInfo = newCarListTimesInfo.concat(
        newCarListLiquidNull_List
      );
      let listRoutes = routes.filter((route) => route.routeOwner === list.id);
      let newCarListLiquid = {};
      listRoutes.map((route) => {
        newCarListLiquid = {
          Номер: "---",
          "Лист №": "---",
          Годин: route.routTotalTime,
          "Час початку": moment(route.routDate).format("DD.MM HH:mm"),
          "Час закінчення": moment(route.routArrival).format("DD.MM HH:mm"),
          Мета: route.cargoName,
          Зауваження: route.routeTo,
        };
        newCarListTimesInfo = newCarListTimesInfo.concat(newCarListLiquid);
        return route;
      });
      return list;
    });
    return car;
  });
  return newCarListTimesInfo;
};
