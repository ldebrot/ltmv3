export class dbuser {
    public meetings: object;
    public private: object;
    public public: object; 
    
    constructor(meetings: object) {
        this.meetings = {};
        this.private = {};
        this.public = {};
    }
}    
