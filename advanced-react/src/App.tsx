// import { LargeAuthorListItems } from "./components/Authors/LargeListItems";
// import { SmallAuthorListItems } from "./components/Authors/SmallListItems";
// import { LargeBookListItem } from "./components/Books/LargeListItems";
// import { SmallBookListItem } from "./components/Books/SmallListItems";
// import { NumberedList } from "./components/Lists/Numbered";
// import { RegularList } from "./components/Lists/Regular";
// import { SplitScreen } from "./components/SplitScreen";
// import { authors } from "./data/authors";
// import { books } from "./data/books";

import { UserInfo } from "./components/UserInfo";
import { UserLoader } from "./containers/UserLoader";
import { ResourceLoader } from "./containers/ResourceLoader";
import { DataSource } from "./containers/DataSource";
import usersService from "./api/usersService";
import { DataSourceWithRenderProps } from "./containers/DataSourceWithRenderProps";
import { getDataFromLocalStorage } from "./utils/localStorage";
import { Message } from "./components/Message";
import { UnControlledForm } from "./components/UnControlledForm";
import { ControlledFlow } from "./components/ControlledFlow";
import { logProps } from "./components/HOC/logProps";
import { useState } from "react";
import { includeUser } from "./components/HOC/includeUser";
import { UserForm } from "./components/UserForm";
import { UserInfoWithHook } from "./components/UserInfoWithHook";
import { RecursiveComponent } from "./components/RecursiveComponent";
import { RedButton, SmallRedButton } from "./components/Composition";
import Card from "./components/CompoundComponents";
import ParentComponent from "./components/ObserverPattern";
import { ForwardRef } from "./components/ForwardRef";
import { ReactPortal } from "./components/ReactPortal";
import { ErrorBoundaryExample } from "./components/ErrorBoundary";
import { Keys } from "./components/Keys";
import {
  EventListeners,
  EventListenersTopToBottom,
} from "./components/EventListeners";
import { UseLayoutEffect } from "./components/UseLayoutEffect";
import { UseId } from "./components/UseId";
import { UseCallbackRef } from "./components/UseCallbackRef";
import { UseImperativeHandle } from "./components/UseImperativeHandle";

// const Left = ({ title }: { title: string }) => (
//   <h2 style={{ backgroundColor: "coral" }}>{title}</h2>
// );

// const Right = ({ title }: { title: string }) => (
//   <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>
// );

// const StepOne = ({ goNext }) => {
//   return (
//     <div>
//       <h1>Step One</h1>
//       <p>Enter your name:</p>
//       <button onClick={() => goNext({ name: "Arghun" })}>Next</button>
//     </div>
//   );
// };

// const StepTwo = ({ goNext }) => {
//   return (
//     <div>
//       <h1>Step Two</h1>
//       <p>Enter your age</p>
//       <button onClick={() => goNext({ age: 29 })}>Next</button>
//     </div>
//   );
// };

// const StepThree = ({ goNext }) => {
//   return (
//     <div>
//       <h1>Step Three</h1>
//       <p>Enter your country</p>
//       <button onClick={() => goNext({ country: "Sweden" })}>Next</button>
//     </div>
//   );
// };

// const UserInfoWithLogs = logProps(UserInfo);
// const UserInfoWithLoader = includeUser(UserInfo, "2");

const myNestedObject = {
  key1: "value1",
  key2: {
    innerKey1: "innerValue1",
    innerKey2: {
      innerInnerKey1: "innerInnerValue1",
      innerInnerKey2: "innerInnerValue2",
    },
  },
  key3: "value3",
};

function App() {
  // const [data, setData] = useState({});
  // const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // const goNext = (dataFromStep) => {
  //   setData({ ...data, ...dataFromStep });
  //   setCurrentStepIndex(currentStepIndex + 1);
  // };

  return (
    // <SplitScreen leftWidth={1} rightWidth={3}>
    //   <Left title="I am Left!" />
    //   <Right title="I am Right!" />
    // </SplitScreen>
    // <>
    //   <RegularList
    //     items={authors}
    //     sourceName="author"
    //     ItemComponent={SmallAuthorListItems}
    //   />
    //   <RegularList
    //     items={authors}
    //     sourceName="author"
    //     ItemComponent={LargeAuthorListItems}
    //   />
    //   <RegularList
    //     items={books}
    //     sourceName="book"
    //     ItemComponent={SmallBookListItem}
    //   />
    //   <RegularList
    //     items={books}
    //     sourceName="book"
    //     ItemComponent={LargeBookListItem}
    //   />
    //   <NumberedList
    //     items={authors}
    //     sourceName="author"
    //     ItemComponent={SmallAuthorListItems}
    //   />
    //   <NumberedList
    //     items={books}
    //     sourceName="book"
    //     ItemComponent={SmallBookListItem}
    //   />
    //   <NumberedList
    //     items={books}
    //     sourceName="book"
    //     ItemComponent={LargeBookListItem}
    //   />
    // </>

    // <>
    //   <UserLoader userId={2}>
    //     <UserInfo />
    //   </UserLoader>

    //   <UserLoader userId={4}>
    //     <UserInfo />
    //   </UserLoader>
    // </>

    // <>
    //   <ResourceLoader
    //     resourceUrl="https://jsonplaceholder.typicode.com/users/2"
    //     resourceName="user"
    //   >
    //     <UserInfo />
    //   </ResourceLoader>
    // </>

    // <>
    //   <DataSource getData={() => usersService.getUser(1)} resourceName="user">
    //     <UserInfo />
    //   </DataSource>
    // </>

    /** --------------------  DataSource With RenderProps -------------------------- */

    // <>
    //   <DataSourceWithRenderProps
    //     getData={() => usersService.getUser(1)}
    //     render={(resource) => <UserInfo user={resource} />}
    //   />

    //   <DataSourceWithRenderProps
    //     getData={() => getDataFromLocalStorage("test")}
    //     render={(resource) => <Message message={resource} />}
    //   />
    // </>

    /** --------------------  UnControlled Component -------------------------- */

    // <UnControlledForm />

    /** --------------------  Controlled Component -------------------------- */

    // It's just simply a form with defined states for each input field - with controlled forms you can check and validate the form and show error messages in case of validation failure.

    /** -------------------- Controlled Flow -------------------------- */
    // <>
    //   <ControlledFlow currentIndex={currentStepIndex} onNext={goNext}>
    //     <StepOne />
    //     <StepTwo />
    //     {data.age < 28 ? <StepThree /> : null}
    //   </ControlledFlow>
    // </>

    /** -------------------- HOC Data logging and Data Fetching -------------------------- */
    // <>
    //   <UserInfoWithLogs test="Test prop" a="This is A" b={22} />
    //   <UserInfoWithLoader />
    // </>

    /** -------------------- HOC Data Fetching and updating -------------------------- */
    // <UserForm />

    /** -------------------- Data Fetching with hook -------------------------- */
    // <UserInfoWithHook userId={3} />

    /** -------------------- Recursive Component -------------------------- */
    // <RecursiveComponent data={myNestedObject} />

    /** -------------------- Composition & Partial component pattern -------------------------- */
    // <>
    //   <RedButton text="Big Red Btn" />
    //   <SmallRedButton text="Small Red Btn" />
    // </>

    //** -------------------- Compound Components -------------------------- */
    // As you can see this is very clean approach to create a compound component. You can use this pattern to create a complex component that has multiple parts and each part can be used independently.
    // In the example below, we have a Card component that has three parts: Header, Body, and Footer. You can use these parts independently or together to create a Card component.
    // If we didn't use the compound component pattern, we would have to pass all the parts of the card as props to the Card component. This would make the Card component less flexible and harder to use.
    // <>
    //   <Card name="arghun">
    //     <Card.Header>Header</Card.Header>
    //     <Card.Body>Body</Card.Body>
    //     <Card.Footer>Footer</Card.Footer>
    //   </Card>
    // </>

    //** -------------------- Observer Pattern -------------------------- */
    // We have used Observer pattern which we have attached listeners to Buttons component buttons and when the buttons are clicked, the listeners are triggered and the Counter component is updated.
    // So, the Counter component is observing the Buttons component and when the buttons are clicked, the Counter component is updated.
    // So, we don't have to pass state to ParentComponent and then pass it to the children components. We can use Observer pattern to update the components when the state changes.
    // <ParentComponent />

    /** -------------------- React Portal -------------------------- */
    // <div style={{ marginTop: "20%", marginLeft: "20%" }}>
    //   <ReactPortal />
    // </div>

    /** -------------------- Forward Ref -------------------------- */
    // <ForwardRef />

    /** -------------------- ErrorBoundaryExample ----------------------- */
    // <ErrorBoundaryExample />

    /** -------------------- Keys ----------------------- */
    // <Keys />

    /** -------------------- Event Listeners ---------------------- */
    // <EventListeners />
    // <EventListenersTopToBottom />

    /** -------------------- UseLayoutEffect ------------------------- */
    // <UseLayoutEffect />

    /** -------------------- UseId ----------------------------- */
    // <UseId />

    /** -------------------- UseCallbackRef ------------------------ */
    // <UseCallbackRef />

    /** -------------------- useImperativeHandle ------------------------ */
    <UseImperativeHandle />
  );
}

export default App;
