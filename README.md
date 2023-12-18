# Z-Manager

z-index 요소를 관리하기 위한 방법을 테스트합니다.

# Ideation

프론트엔드 개발자들은 단순 평면 페이지 뿐만 아니라, 겹겹이 쌓여진 페이지를 만들 때가 있습니다.

그 때 각 층에 있는 페이지는 z-index 라는 정적으로 부여되어야만하는 css 속성으로 제어됩니다.

따라서 관리 포인트가 존재하지 않는 경우 값들이 파편화되기 쉽고, 

어떠한 저장소가 있어도, 매번 새로운 뎁스가 생길 때마다 개발자가 직접 값을 업데이트해야 됩니다.

사실 별 거 아닌 작업같지만, 귀찮고. 또 잘못 설정하면 사용자가 화면을 제대로 이용하지 못하는 페인 포인트가 되기도 합니다.

이 문제를 해결하기 위한 탐구를 진행하는 레포지토리로서,

그 목적은 개발자가 z-index에 관심을 가질 필요 없이, 간단한 사용방식으로 레이어를 편리하게 관리할 수 있도록 하자는 것에 있습니다.

# 1️⃣ proxy로 관리하기 

Proxy 객체로 구현된 방식으로, 사용법은 다음과 같습니다.

- 합의된 zIndex 객체를 정의합니다. 이 때, 외부로부터 이 객체가 오염되지 않도록 freeze로 덮습니다.
  
```js
const ZIndexConsts: ZIndexConstsType = Object.freeze({
  BASE: 0,
  NAV: 1,
  AUTH: 5000,
  MAINTAIN: 9000,
  SYSTEM: 9999,
});
```

- Proxy 객체로 한 번 더 감싼 뒤, get 메서드에 트랩을 겁니다.
  - 호출한 프로퍼티가 있는 경우, 해당 프로퍼티의 값을 반환
  - 프로퍼티가 없는 경우, 조건에 따라 값을 반환하거나 에러를 발생시킴.

## **Logic**

1. Number 자료형 변환시 NaN이 되지 않아야할 것.
2. 서비스의 최상단 zIndex보다 크지 않을 것.
3. 음수가 되지 않을 것.
4. 위 조건을 모두 만족하는 경우, float로 들어온 케이스를 방지하기 위해 내림 처리가 된 값을 반환한다.

## **Flow** 🎼
 
1. zIndex가 적용되어야할 아무 컴포넌트를 작성합니다.
2. 해당 컴포넌트에 ZProxy를 import 합니다.
3. zIndex가 부여될 컴포넌트의 z-index에 ZProxy[property] 를 부여한다.

## **ETC** 🙄

- 상태를 가지지 않으므로, 마치 순수한 정적 객체처럼 활약할 수 있습니다.
- 그러나 상태를 가지지 않는다는 것은, 관리의 주체가 개발자가 된다는 것입니다.
- 이 경우, 컴포넌트의 갯수가 많아지고, 뎁스가 깊어질 수록 휴먼 에러의 가능성이 높아집니다.
  - Ex) 2중...3중...4중...n중...형태의 컴포넌트를 만드는 경우.
  - 이런 상황의 경우, 차라리 페이지의 기준 z-index를 잡아두고, 등차수열 형태로 z-index를 명시한 별도의 객체를 쓰는 것이 나을 수도 있습니다.


# 2️⃣ class 객체와 Context API

Context API로 구현된 방식으로, 사용법은 다음과 같습니다.

- 활용하고자 하는 범위에 Provider를 감쌉니다. ( Ex. App.tsx )

```js
<ZProvider>...</ZProvider>
```

- ZProvider 내부에 선언된 컴포넌트에서, zIndex 제어가 필요한 컴포넌트에 대해 ZLayer 컴포넌트로 감쌉니다.

```js
<ZLayer>
  <Something />
</ZLayer>
```

## Logic

### **[Members]** 👨‍👩‍👧‍👧

ZManager 인스턴스는 Layer로서 정의된 컴포넌트들을 관리하는 layers 배열을 내부 private 멤버로서 가집니다.

### **[Methods]** 💾

- zIndex

  zIndex 함수는 전달받은 id에 해당하는 layer의 zIndex 값을 반환합니다.

- onMount

  onMount 함수는 useEffect를 통해, 마운트 시점에 호출하는 용도로서 layers 배열에 해당 컴포넌트를 의미하는 uuid와 zIndex를 부여하고 uuid를 반환합니다.
  이 때 부여되는 zIndex는 현재 존재하는 layer들의 zIndex 중 최상값에 1을 더한 값입니다.

- onUnMount

  onUnMount 함수는 useEffect의 클린업 시점에 선언되며, 인스턴스의 요소 중 전달받은 id를 지닌 것을 제외한 배열을 layers 배열에 새로 할당합니다.

## **Flow** 🎼

1. ZProvider의 전역에 ZManager 인스턴스를 선언합니다.
2. provider value로 인스턴스의 메서드들을 넘깁니다. 이 때, bind 함수를 이용하여 각 메서드의 Context를 고정시킵니다.
3. ZLayer는 mount될 때 onMount 메서드를 호출하여 uuid를 발급받고, 내부 상태값인 layerId에 업데이트합니다.
4. ZLayer의 children을 감싸는 컴포넌트에 layerId를 전달받은 zIndex 메서드로 zIndex 값을 부여합니다.
5. 해당 레이어가 unmount될 때는, onUnMount 함수에 발급받은 uuid를 전달하여 ZManager 인스턴스의 layers 배열을 업데이트합니다.

## **ETC** 🙄

- 클래스 내부의 메서드는 반드시 렌더링으로 인해 재호출이 되어서는 안됩니다. 따라서, 라이브러리화를 한다면 ZProvider, ZLayer 컴포넌트 외에는 export 되어서는 안됩니다.
- 클래스 인스턴스는 Provider에 전달될 때 bind 함수로 묶어주지 않는 경우, 메서드들이 인스턴스의 맥락을 따라가지 못하는데, 그것은 예컨대 React 자체의 ContextAPI 내부의 value 쪽 맥락이 잡혀서이지 않을까 예상됩니다.
- 현재 지정된 기준 zIndex는 0으로부터 시작하므로, 기본 디자인 시스템의 최종 depth 이상의 값이 기준 값으로 지정될 필요가 있습니다. 따라서, 레이아웃 depth 값이 사전 형태로 지정될 필요가 있음을 느낍니다.
- 같은 기능을 ContextAPI + state 및 전역 변수 라이브러리를 이용해 충분히 구현할 수 있을겁니다.

#### dependencies

class 방식은 uuid 라이브러리의 v4 함수를 이용해 각 layer의 id를 관리합니다.

이는 개발자로 하여금, 레이어를 선언할 때 수동으로 이름, 또는 id를 명시하지 않도록 하기 위함입니다.
