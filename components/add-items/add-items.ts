import { state } from "../../src/state";

class AddItem extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    const addItem = this.shadow.querySelector(".addItem")!;
    const inputEl = this.shadow.querySelector(".input")! as any;

    addItem.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target as any;
      const uniqueId = Math.floor(Math.random() * 100 - 1) + 1;
      const newItem = {
        id: uniqueId,
        content: f.text.value,
        check: false,
        delete: false,
      };
      state.addItem(newItem);
      inputEl.value = "";
    });
  }

  render() {
    this.shadow.innerHTML = `
    <div class="container">
      <form class="addItem">
       <input name="text" type="text" class="input" placeholder="Nuevo pendiente">
        <button class="button">+</button>
      </form>
    </div>

    <style>
    *{
      box-sizing: border-box;
    }
      .container{
        background-color: cadetblue;
        margin: 10px;
        padding: 5px;
      }

      .addItem{
        padding:5px;
        display:flex;
        align-items: center;
        justify-content: space-between;
      }

      .input{
        height: 30px;
        width: 90%;
        flex-grow: 90%;
      }

      .button{
        height: 30px;
        width: 30px;
        font-family: "Roboto";
        font-size: 24px;
        font-weight: 400;
        text-align: center;
      
      }
    </style>
        `;
  }
}

customElements.define("add-item", AddItem);
