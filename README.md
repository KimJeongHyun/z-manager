# Z-Manager

z-index 요소를 관리하기 위한 방법을 테스트합니다.

## 1️⃣ proxy로 관리하기 

## 2️⃣ class로 관리하기

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

### Logic

## **[Members]** 👨‍👩‍👧‍👧

ZManager 인스턴스는 Layer로서 정의된 컴포넌트들을 관리하는 layers 배열을 내부 private 멤버로서 가집니다.

## **[Methods]** 💾

- zIndex

  zIndex 함수는 전달받은 id에 해당하는 layer의 zIndex 값을 반환합니다.

- onMount

  onMount 함수는 useEffect를 통해, 마운트 시점에 호출하는 용도로서 layers 배열에 해당 컴포넌트를 의미하는 uuid와 zIndex를 부여하고 uuid를 반환합니다.
  이 때 부여되는 zIndex는 현재 존재하는 layer들의 zIndex 중 최상값에 1을 더한 값입니다.

- onUnMount

  onUnMount 함수는 useEffect의 클린업 시점에 선언되며, 인스턴스의 요소 중 전달받은 id를 지닌 것을 제외한 배열을 layers 배열에 새로 할당합니다.

## **[Flow]** 🎼

1. ZProvider의 전역에 ZManager 인스턴스를 선언합니다.
2. provider value로 인스턴스의 메서드들을 넘깁니다. 이 때, bind 함수를 이용하여 각 메서드의 Context를 고정시킵니다.
3. ZLayer는 mount될 때 onMount 메서드를 호출하여 uuid를 발급받고, 내부 상태값인 layerId에 업데이트합니다.
4. ZLayer의 children을 감싸는 컴포넌트에 layerId를 전달받은 zIndex 메서드로 zIndex 값을 부여합니다.
5. 해당 레이어가 unmount될 때는, onUnMount 함수에 발급받은 uuid를 전달하여 ZManager 인스턴스의 layers 배열을 업데이트합니다.

## **[ETC]** 🙄

- 클래스 인스턴스에서 관리되므로 ContextAPI 사용시 우려되는 리렌더링 문제가 어느정도 해소되었을 것이라고 생각합니다.
- 클래스 내부의 메서드는 반드시 렌더링으로 인해 재호출이 되어서는 안됩니다. 따라서, 라이브러리화를 한다면 ZProvider, ZLayer 컴포넌트 외에는 export 되어서는 안됩니다.
- 같은 기능을 useState 또는 Proxy로 구현가능할 것으로 예상됩니다.
- 클래스 인스턴스는 Provider에 전달될 때 bind 함수로 묶어주지 않는 경우, 메서드들이 인스턴스의 맥락을 따라가지 못하는데, 그것은 예컨대 React 자체의 ContextAPI 내부의 value 쪽 맥락이 잡혀서이지 않을까 예상됩니다.
- 현재 지정된 기준 zIndex는 0으로부터 시작하므로, 기본 디자인 시스템의 최종 depth 이상의 값이 기준 값으로 지정될 필요가 있습니다. 따라서, 레이아웃 depth 값이 사전 형태로 지정될 필요가 있음을 느낍니다.

### dependencies

class 방식은 uuid 라이브러리의 v4 함수를 이용해 각 layer의 id를 관리합니다.

이는 개발자로 하여금, 레이어를 선언할 때 수동으로 이름, 또는 id를 명시하지 않도록 하기 위함입니다.
