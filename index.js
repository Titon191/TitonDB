const fs = require('fs');

class TitonDB {
    constructor(filename) {
        this.filename = filename;
        this.data = {};

        if (fs.existsSync(filename)) {
            const fileData = fs.readFileSync(filename, 'utf8');
            this.data = JSON.parse(fileData);
        }
    }

    add(name, value) {
        this.setValue(name, this.getValue(name) + value);
    }

    subtract(name, value) {
        this.setValue(name, this.getValue(name) - value);
    }

    set(name, value) {
        this.setValue(name, value);
    }

    get(name) {
        return this.getValue(name);
    }

    delete(name) {
        this.deleteValue(name);
    }

    clear() {
        this.data = {};
        this.save();
    }

    json() {
        return JSON.stringify(this.data, null, 2);
    }

    setValue(name, value) {
        const keys = name.split('.');
        let current = this.data;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
        this.save();
    }

    getValue(name) {
        const keys = name.split('.');
        let current = this.data;
        for (const key of keys) {
            if (!current[key]) {
                return undefined;
            }
            current = current[key];
        }
        return current;
    }

    deleteValue(name) {
        const keys = name.split('.');
        let current = this.data;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) {
                return; 
            }
            current = current[key];
        }
        delete current[keys[keys.length - 1]];
        this.save();
    }

    filter(range, criteria, value) {
        let database = this.data;
        let filteredRecords = {};
        const allRecords = (range === '*') ? database : database[range];
    
        switch (criteria) {
            case 'largerThan':
                for (const key in allRecords) {
                    if (typeof allRecords[key] === 'number' && allRecords[key] > value) {
                        filteredRecords[key] = allRecords[key];
                    }
                }
                break;
            case 'smallerThan':
                for (const key in allRecords) {
                    if (typeof allRecords[key] === 'number' && allRecords[key] < value) {
                        filteredRecords[key] = allRecords[key];
                    }
                }
                break;
            case 'equal':
                for (const key in allRecords) {
                    if (typeof allRecords[key] === 'number' && allRecords[key] === value) {
                        filteredRecords[key] = allRecords[key];
                    }
                }
                break;
            case 'max':
                let maxKey;
                let maxValue = -Infinity;
                for (const key in allRecords) {
                    if (typeof allRecords[key] === 'number' && allRecords[key] > maxValue) {
                        maxKey = key;
                        maxValue = allRecords[key];
                    }
                }
                if (maxKey) {
                    filteredRecords[maxKey] = maxValue;
                }
                break;
            case 'min':
                let minKey;
                let minValue = Infinity;
                for (const key in allRecords) {
                    if (typeof allRecords[key] === 'number' && allRecords[key] < minValue) {
                        minKey = key;
                        minValue = allRecords[key];
                    }
                }
                if (minKey) {
                    filteredRecords[minKey] = minValue;
                }
                break;
            default:
                throw new Error('Invalid criteria. Allowed: largerThan, smallerThan, equal, min, max');
        }
    
        return filteredRecords;
    }
    
    
    save() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
    }
}

module.exports = TitonDB;
