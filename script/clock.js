export default function my_Clock(clock) {
    this.cur_date = new Date();
    this.hours = this.cur_date.getHours();
    this.minutes = this.cur_date.getMinutes();
    this.seconds = this.cur_date.getSeconds();
    this.container=document.getElementById(clock);
    this.containerName=clock;
    // this.container = document.getElementById(clock);
}
my_Clock.prototype.run = function () {
    setInterval(this.update.bind(this), 1000);
};
my_Clock.prototype.update = function () {
    this.updateTime(1);
    const timeString= `${this.hours < 10 ? '0' + this.hours : this.hours}:${this.minutes<10? '0' + this.minutes : this.minutes}:${this.seconds<10? '0' + this.seconds : this.seconds}`;
    if(this.container==null){
        this.container=document.getElementById(this.containerName);
    }
    this.container.innerText =timeString;
    //console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
};
my_Clock.prototype.updateTime = function (secs) {
    this.seconds += secs;

    if (this.seconds >= 60) {
        this.minutes++;
        this.seconds = 0;
    }

    if (this.minutes >= 60) {
        this.hours++;
        this.minutes = 0;
    }

    if (this.hours >= 24) {
        this.hours = 0;
    }


};

// document.getElementById('menu-clock').innerText='kldhksjhcljhdk';