/**
 * Proxy代理
 */

class Band {
    constructor(name) {
        this.name = name || 'Band';
        this.vocal = null;
        this.guitar = null;
        this.bass = null;
        this.drump = null;
    }
    live(path) {
        console.log(this.name, ' is living in ', path);
    }
}
Band.prototype.num = 5;


