import { useReducer,useEffect } from "react";
import Form from "./Form";
import { booksReducer } from "./lib/Reducer";
import "./App.css";
import gsap from "gsap";


function App() {

  const [books, dispatch] = useReducer(booksReducer, [
    {
      id: crypto.randomUUID(),
      text: "The Great Gatsby",
      likes: 4,
    },
    {
      id: crypto.randomUUID(),
      text: "1984",
      likes: 10,
    },
  ]);


  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".text",
      { x: -200, opacity: 0 },   
      { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }  
    );
  }, []);
  

  return (
    <>
      <header>
        <h1 class ="text">Book Vault</h1>
      </header>

      <Form
        onSubmit={(name) => dispatch({ type: "ADD", payload: name })}
        onSort={() => dispatch({ type: "SORT" })}
        onOrder={() => dispatch({ type: "ORDER" })}
       />

      {books.map((book) => (
        <pre key={book.id} class ="text">
          <h3>{book.text}</h3>
          <p id="like-count">{book.likes} ❤️</p>

          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => dispatch({ type: "LIKE", payload: book.id })}
            >
              Like
            </button>
            <button
              onClick={() => dispatch({ type: "DISLIKE", payload: book.id })}
            >
              Dislike
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: book.id })}
            >
              Delete
            </button>
          </div>
        </pre>
      ))}
    </>
  );
}

export default App;