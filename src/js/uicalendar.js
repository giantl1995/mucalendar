const { Calendar } = require('./calendar.js')

const Mounts = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


export class UIcalendar {

    constructor(id) {
        this.tbl = document.getElementById(id);
        let date = new Date()
        let month = date.getMonth()
        let year = date.getFullYear()
        this.calendar = new Calendar(month, year)
        this.generateCalendar()
        this.generateHeader()
    }

    generateHeader() {
        let calendarHeader = this.tbl.parentElement.parentElement
        let div = document.createElement("div");
        div.className = "calendar_header"
        let arrowL = document.createElement("a");
        let arrowR = document.createElement("a");
        let Smount = document.createElement("p");

        arrowL.className = 'arrow_left'
        arrowR.className = 'arrow_right'
        Smount.id = 'name_mount'
        Smount.innerText = Mounts[this.calendar.month] + " " + this.calendar.year
        div.appendChild(arrowL)
        div.appendChild(Smount)
        div.appendChild(arrowR)
        calendarHeader.insertBefore(div, calendarHeader.childNodes[0])
        arrowL.addEventListener('click', () => {
            this.change_month(-1)
        })

        arrowR.addEventListener('click', () => {
            this.change_month(1)
        })
    }
    generateCalendar() {

        this.day_fill(this.calendar.firstday, 1)
        for (let i = 1; i <= this.calendar.lastday.getDate(); i++) {

            let div = document.createElement("div");

            div.className = "day"
            var is_now = this.findNow(i)
            if (is_now) {
                div.classList.add("day_now")
            }
            div.setAttribute("data-fecha", i + "/" + this.calendar.month + "/" + this.calendar.year)
            div.setAttribute("data-complete", false)
            div.innerHTML = i
            this.tbl.appendChild(div);
        }
        this.day_fill(this.calendar.lastday, 2)

    }

    day_fill(date, type) {
        let week = this.day_format(date)

        date.setDate(date.getDate() - 1);
        if (type == 1) {



            for (let i = week; i > 0; i--) {
                let div = document.createElement("div");
                div.className = "day day--disabled"
                div.innerHTML = date.getDate() - i + 1
                this.tbl.appendChild(div);
            }

        } else {
            for (let i = 1; week < 6; i++) {
                let div = document.createElement("div");
                div.className = "day day--disabled"
                div.innerHTML = i
                week++;
                this.tbl.appendChild(div);
            }
        }
    }
    day_format(day_month) {
        var day_week = day_month.getDay() - 1;
        if (day_week == -1) {
            day_week = 6
        }
        return day_week
    }

    change_month(i) {
        this.calendar.changeMounth(i)
        let Smount = document.getElementById('name_mount')
        Smount.innerText = Mounts[this.calendar.month] + " " + this.calendar.year
        this.generateCalendar()

    }
    findNow(day) {
        let date = new Date(this.calendar.year, this.calendar.month, day)
        date.setHours(0, 0, 0, 0)
        if (date.getTime() === this.calendar.day_now.getTime()) {
            return true
        }
        return false

    }
}