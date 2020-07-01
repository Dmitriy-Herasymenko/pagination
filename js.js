const itemsArray = [{
        name: "Андрей",
        surname: "Пугач",
        age: 30
    },
    {
        name: "Игорь",
        surname: "Калеринков",
        age: 27
    },
    {
        name: "Вася",
        surname: "Стремянов",
        age: 15
    },
    {
        name: "Николай",
        surname: "Усачов",
        age: 40
    },
    {
        name: "Алекс",
        surname: "Шатунов",
        age: 82
    },
    {
        name: "Петро",
        surname: "Великий",
        age: 55
    },
    {
        name: "Слава",
        surname: "Белорусов",
        age: 35
    },
    {
        name: "Маша",
        surname: "Квасовая",
        age: 18
    },
    {
        name: "Катя",
        surname: "Юрмозина",
        age: 51
    },
    {
        name: "Люба",
        surname: "Генабишвили",
        age: 36
    },
    {
        name: "Ира",
        surname: "Маленькая",
        age: 39
    },
    {
        name: "Ира",
        surname: "Квазимодовна",
        age: 24
    },
    {
        name: "Петя",
        surname: "Ракушков",
        age: 27
    },
    {
        name: "Женя",
        surname: "Валейганов",
        age: 25
    },

]

const select = document.querySelector(".select");
const sort = document.querySelector(".sort");

let notesOnPage = +select.value;


const renderLi = () => {
    let items = [];
    const pagination = document.querySelector(".pagination");
    let countOfItems = Math.ceil(itemsArray.length / notesOnPage);

    for (let i = 1; i <= countOfItems; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        pagination.appendChild(li);
        items.push(li);
    }

    return items;
}

const outerTableHTML = (pageNum) => {
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = itemsArray.slice(start, end);
    let inner = notes.map(el => {
        return ` 
        <tr>
             <td>${el.name}</td>
             <td>${el.surname}</td>
             <td>${el.age}</td>
           </tr>
           `
    })
    let outerTable = inner.join(``);
    return outerTable;

}

const renderTableStart = (items) => {

    const table = document.querySelector(".tbody");
    items[0].classList.add('active');

    let pageNum = 1;

    const render = outerTableHTML(pageNum);

    table.innerHTML = render;

}

const renderTableClick = (items) => {

    const table = document.querySelector(".tbody");
    let active;

    items.forEach(item => {
        item.addEventListener("click", function () {
            if (active) {
                active.classList.remove('active');
            }

            active = this;
            items[0].classList.remove('active');
            this.classList.add('active');

            let pageNum = +this.innerHTML;

            const render = outerTableHTML(pageNum);

            table.innerHTML = render;

        })

    })
}

const renderTable = (items) => {

    renderTableStart(items);
    renderTableClick(items);
}

const outerHTML = (request) => {

    const items = renderLi();
    renderTable(items);
}

const getRequest = async (data) => {
    const url = `http://api.odesseo.com.ua/warehouses?limit=3`;
    const response = await fetch(url);
    return await response.json();
}

const tableOut = async () => {
    const currentGet = await getRequest();
    outerHTML();
}

tableOut();

const selectValue = () => {

    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    select.addEventListener('change', e => notesOnPage = +e.target.value);
    outerHTML();

}

const sortArray = () => {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";;
    itemsArray.sort((a, b) => (a.name > b.name ? 1 : -1));
    outerHTML();
}


sort.addEventListener('click', sortArray);
select.addEventListener('click', selectValue);