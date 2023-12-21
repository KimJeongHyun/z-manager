type NumberObjectType = {
  [x in string | symbol]: number;
};

interface ZIndexConstsType extends NumberObjectType {
  BASE: number;
  NAV: number;
  AUTH: number;
  MAINTAIN: number;
  SYSTEM: number;
}

/**
 * @prop BASE : App의 바탕
 * @prop NAV : App의 Nav 역할을 할 컴포넌트의 위치.
 * @prop AUTH : 인증/인가 관련 중요 컴포넌트의 위치. 서비스가 정상인 경우, 최상단에 위치함.
 * @prop MAINTAIN : App 서비스의 자체 점검시 표시할 컴포넌트의 위치
 * @prop SYSTEM : 네트워크 혹은 서비스의 이상에 의해 표시될 컴포넌트의 위치
 * @description App에 사용될 z-index의 리스트.
 * @description 런타임에서 변경될 수 없도록 freeze로 처리합니다.
 */
const ZIndexConsts: ZIndexConstsType = Object.freeze({
  BASE: 0,
  NAV: 1,
  AUTH: 5000,
  MAINTAIN: 9000,
  SYSTEM: 9999,
});

/**
 * @method get 기준 프로퍼티로 호출된 값을 반환합니다. 이미 정의된 프로퍼티 값이 아닌 경우엔 Number 변환이 되는지, 최상단 인덱스보다 낮은 값인지 확인하여 경우에 맞게 반환합니다.
 * @description z-index를 관리하는 프록시.
 * @description ZProxy는 ZIndexConsts의 프로퍼티를 따릅니다. 다른 깊이의 레이어를 선언할 때는, ZProxy[1] 과 같이 Number형식의 값으로 호출할 수 있습니다.
 * @description 항상 값을 지정해줘야되기 때문에, 컴포넌트가 여러겹으로 쌓인 페이지를 작업할 때엔 더 신경써야됩니다.
 * @description 기존에 설정된 z-index 값보다 상위의 값으로 넣어주어야 하기 때문에 번거로울 수 있습니다.
 */
export const ZProxy = new Proxy(ZIndexConsts, {
  get(zIndexes, zKey) {
    if (zKey in zIndexes) {
      return zIndexes[zKey];
    }

    const numberizeKey = Number(zKey);

    if (isNaN(numberizeKey)) {
      throw new Error("Prop's type must be 'number'.");
    }

    if (numberizeKey > ZIndexConsts.AUTH) {
      throw new Error("ZIndex must be lower than AUTH (5000)");
    }

    if (numberizeKey < 0) {
      throw new Error("ZIndex must be over than 0");
    }

    return Math.floor(numberizeKey);
  },
});
