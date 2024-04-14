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

// const Left = ({ title }: { title: string }) => (
//   <h2 style={{ backgroundColor: "coral" }}>{title}</h2>
// );

// const Right = ({ title }: { title: string }) => (
//   <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>
// );

function App() {
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

    <>
      <DataSourceWithRenderProps
        getData={() => usersService.getUser(1)}
        render={(resource) => <UserInfo user={resource} />}
      />

      <DataSourceWithRenderProps
        getData={() => getDataFromLocalStorage("test")}
        render={(resource) => <Message message={resource} />}
      />
    </>
  );
}

export default App;
