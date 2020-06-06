export class Calendar {
    constructor(month, year) {
        this.day_now = new Date();
        this.day_now.setHours(0, 0, 0, 0)
        console.log(this.day_now)
        this.generateDate(month, year);
    }
    generateDate(month, year) {
        this.year = year
        this.month = month
        this.firstday = new Date(this.year, this.month, 1);
        this.lastday = new Date(this.year, this.month + 1, 0);

    }
    toString() {
        console.log(this.year + " / / " + this.month)
    }
    changeMounth(i) {
        this.removeAllElement()
        let date = new Date(this.year, this.month + i, 1)
        this.month = date.getMonth()
        this.year = date.getFullYear()
        this.generateDate(this.month, this.year);
    }
    removeAllElement() {
        document.querySelectorAll('.day').forEach(function(a) {
            a.remove()
        })

    }

}