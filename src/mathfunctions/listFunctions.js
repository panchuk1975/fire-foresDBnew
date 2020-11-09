export const NewListLiquidsCount = (routes) => {
  let oldRouteNumber = 0;
  let listLiquids = [];
  if (!routes) {
    routes = [];
  }
  routes.map((route) => {
    let balanceStart = 0;
    let received = 0;
    let expended = 0;
    let balanceFinish = 0;
    let existLiquid = !!listLiquids.filter(
      (liq) => liq.name === route.liquidName
    ).length;
    if (!existLiquid) {
      balanceStart =
        parseInt((balanceStart + Number(route.balanceStart)) * 100, 10) / 100;
      received = parseInt((received + Number(route.received)) * 100, 10) / 100;
      expended = parseInt((expended + Number(route.expended)) * 100, 10) / 100;
      balanceFinish =
        parseInt((balanceFinish + Number(route.balanceFinish)) * 100, 10) / 100;
      let Liquid = {
        name: route.liquidName,
        balanceStart: balanceStart,
        received: received,
        expended: expended,
        balanceFinish: balanceFinish,
      };
      listLiquids = listLiquids.concat([Liquid]);
    } else {
      let modifyLiquid = listLiquids
        .filter((liq) => liq.name === route.liquidName)
        .shift();
      let modifyLiquidList = listLiquids.filter(
        (liq) => liq.name !== route.liquidName
      );
      balanceStart =
        parseInt(Number(modifyLiquid.balanceStart) * 100, 10) / 100;
      if (Number(route.routNumber) < Number(oldRouteNumber)) {
        balanceStart = parseInt(Number(route.balanceStart) * 100) / 100;
      } else {
        balanceStart =
          parseInt(Number(modifyLiquid.balanceStart) * 100, 10) / 100;
      }
      received =
        parseInt(
          (Number(modifyLiquid.received) + Number(route.received)) * 100,
          10
        ) / 100;
      expended =
        parseInt(
          (Number(modifyLiquid.expended) + Number(route.expended)) * 100,
          10
        ) / 100;
      if (Number(route.routNumber) < Number(oldRouteNumber)) {
        balanceFinish =
          parseInt(Number(modifyLiquid.balanceFinish) * 100, 10) / 100;
      } else {
        balanceFinish = parseInt(Number(route.balanceFinish) * 100, 10) / 100;
      }
      let Liquid = {
        name: route.liquidName,
        balanceStart: balanceStart,
        received: received,
        expended: expended,
        balanceFinish: balanceFinish,
      };
      listLiquids = modifyLiquidList.concat([Liquid]);
    }
    oldRouteNumber = Number(route.routNumber);
    return route;
  });
  listLiquids.sort((a, b) => a.name - b.name);
  return listLiquids;
};

export const CommonListRoute = (routes) => {
  if (!routes) {
    routes = [];
  }
  let commonRoute = 0;
  routes.map((route) => {
    commonRoute = commonRoute + Number(route.routeTotal);
    return route;
  });
  return commonRoute;
};

export const CommonListTime = (routes) => {
  if (!routes) {
    routes = [];
  }
  let commonTime = 0;
  routes.map((route) => {
    commonTime = commonTime + Number(route.routTotalTime);
    return route;
  });
  return Math.round(commonTime * 100) / 100;
};
