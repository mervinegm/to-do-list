import { state } from "../../src/state";

class ItemList extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    state.subscribe(() => {
      this.render();
    });

    const buttonEl = this.shadow.querySelector(".delete-button")!;
    const liEl = this.shadow.querySelector(".item")!;
    const lineEl = this.shadow.querySelector(".line");
    const parrafoEl = this.shadow.querySelectorAll(".parrafo")!;
    const checkboxEl: HTMLInputElement =
      this.shadow.querySelector(".checkbox")!;
    const tasks = state.getState().list;

    tasks.forEach((item, index) => {
      checkboxEl.checked = item.completed;

      checkboxEl.addEventListener("change", () => {
        item.completed = checkboxEl.checked;
        this.render();
        updateTaskTextStyles();
      });

      function updateTaskTextStyles() {
        parrafoEl.forEach((taskText: any, index) => {
          if (tasks[index].completed) {
            taskText.style.textDecoration = "line-through";
          } else {
            taskText.style.textDecoration = "none";
          }
        });
      }

      buttonEl.addEventListener("click", () => {
        tasks.splice(index, 1);
        this.render();
      });
    });
  }

  render() {
    const list = state.getState().list;

    this.shadow.innerHTML = `
    <div class="container">
        <ul class="list">
            ${list
              .map((item) => {
                return `
                <li class="item">
                  <div>
                    <input class="checkbox" type="checkbox"> <p class="parrafo">${item.content}</p>                
                  </div>
                  <div>
                    <button class="delete-button">
                      <img class="delete-icon" src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png" alt="">
                    </button>
                  </div>              
                </li>
                <div class="line">

                </div>
                `;
              })
              .join("")}
        </ul>
    </div>

    <style>
    *{
      box-sizing: border-box;
    }
    .container{
        margin: 10px;
        border: solid black 2px;
        background-color:pink;
        box-sizing: border-box;
    }

    ul{
      margin:16px;
      padding:0;
    }

    li{
      list-style:none;
      font-family: "Roboto";
      font-size: 18px;
      font-weight: 400;
      margin-left: 0;
      padding-left: 0;
    }

    p{
      display:inline;
    }

    .parrafo.checked{
      text-decoration:line-through;
      text-decoration-color: black;
    }

    .item{
      display:flex;
      justify-content: space-between;
    }

    .checkbox{
      width: 20px;
      height:20px;
    }
    
    .parrafo{
      display
    }

    .delete-icon{
      width: 20px;
      height:20px;
    }

    .line{
      border: solid 1px black;
      width: auto;
      margin: 5px 0 5px 0;
    }

    </style>
        `;
  }
}

customElements.define("item-list", ItemList);
