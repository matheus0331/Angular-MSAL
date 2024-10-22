const request = require('request-promise-native');
const path = require('path');
const fs = require('fs').promises;

class AirtableManager {
  constructor(baseId, headers) {
    this.baseId = baseId;
    this.headers = headers;
    this.tables = [
      'address',
      'cart',
      'checkout',
      'common',
      'myAccount',
      'order',
      'payment',
      'product',
      'user',
      'clientService',
      'itemCounter',
      'home',
      'faq',
      'wishlist',
      'userProfile',
      'userAccount',
      'checkoutB2B'
    ];
    this.languageTranslations_EN = {};
    this.languageTranslations_EN_GB = {};
    this.languageTranslations_DE_CH = {};
    this.languageTranslations_de = {};
    this.languageTranslations_fr_CH = {};
    this.languageTranslations_fr = {};
    this.languageTranslations_it_CH = {};
    this.languageTranslations_it = {};
    this.languageTranslations_nl = {};
    this.languageTranslations_pl = {};
    this.languageTranslations_es = {};
    this.languageTranslations_pt = {};
    this.languageTranslations_no = {};
    this.languageTranslations_sv = {};
    this.languageTranslations_da = {};
    this.languageTranslations_nl_BE = {};
    this.languageTranslations_fr_BE = {};


  }

  configure(endpointUrl, apiVersion) {
    this.endpointUrl = endpointUrl;
    this.apiVersion = apiVersion;
  }

  require() {
    return request.defaults({
      baseUrl: this.endpointUrl,
      headers: {
        'Authorization': this.headers.Authorization,
        'Content-Type': 'application/json',
        'User-Agent': 'MyApp/1.0.0'
      },
      json: true
    });
  }

  keyParser(obj, key, value) {
    if (!key) return;
    let lastKey = null;
    const keyParts = key.trim().split('.');

    keyParts.forEach((part, index) => {
      if (!obj[part] && index === 0) {
        obj[part] = {};
        lastKey = obj[part];
        return;
      }
      if (obj[part] && index === 0) {
        lastKey = obj[part];
        return;
      }
      if (lastKey[part]) {
        lastKey = lastKey[part];
        return;
      }
      if (index + 1 === keyParts.length) {
        lastKey[part] = value;
        return;
      }
      if (!lastKey[part] && index !== 0) {
        lastKey[part] = {};
        lastKey = lastKey[part];
      }
    });
  }

  async upTranslations(records, tableName, lines) {
    lines.forEach(async (line) => {
      this.keyParser(this.languageTranslations_EN, line.key, line.en);
      this.writeTranslations(records, tableName, 'en', this.languageTranslations_EN);

      this.keyParser(this.languageTranslations_EN_GB, line.key, line.en_GB);
      this.writeTranslations(records, tableName, 'en_GB', this.languageTranslations_EN_GB);

      this.keyParser(this.languageTranslations_DE_CH, line.key, line.de_CH);
      this.writeTranslations(records, tableName, 'de_CH', this.languageTranslations_DE_CH);

      this.keyParser(this.languageTranslations_de, line.key, line.de);
      this.writeTranslations(records, tableName, 'de', this.languageTranslations_de);

      this.keyParser(this.languageTranslations_fr_CH, line.key, line.fr_CH);
      this.writeTranslations(records, tableName, 'fr_CH', this.languageTranslations_fr_CH);

      this.keyParser(this.languageTranslations_fr, line.key, line.fr);
      this.writeTranslations(records, tableName, 'fr', this.languageTranslations_fr);

      this.keyParser(this.languageTranslations_it_CH, line.key, line.it_CH);
      this.writeTranslations(records, tableName, 'it_CH', this.languageTranslations_it_CH);

      this.keyParser(this.languageTranslations_it, line.key, line.it);
      this.writeTranslations(records, tableName, 'it', this.languageTranslations_it);

      this.keyParser(this.languageTranslations_nl, line.key, line.nl);
      this.writeTranslations(records, tableName, 'nl', this.languageTranslations_nl);

      this.keyParser(this.languageTranslations_pl, line.key, line.pl);
      this.writeTranslations(records, tableName, 'pl', this.languageTranslations_pl);

      this.keyParser(this.languageTranslations_es, line.key, line.es);
      this.writeTranslations(records, tableName, 'es', this.languageTranslations_es);

      this.keyParser(this.languageTranslations_pt, line.key, line.pt);
      this.writeTranslations(records, tableName, 'pt', this.languageTranslations_pt);

      this.keyParser(this.languageTranslations_no, line.key, line.no);
      this.writeTranslations(records, tableName, 'no', this.languageTranslations_no);

      this.keyParser(this.languageTranslations_sv, line.key, line.sv);
      this.writeTranslations(records, tableName, 'sv', this.languageTranslations_sv);

      this.keyParser(this.languageTranslations_da, line.key, line.da);
      this.writeTranslations(records, tableName, 'da', this.languageTranslations_da);

      this.keyParser(this.languageTranslations_nl_BE, line.key, line.nl_BE);
      this.writeTranslations(records, tableName, 'nl_BE', this.languageTranslations_nl_BE);

      this.keyParser(this.languageTranslations_fr_BE, line.key, line.fr_BE);
      this.writeTranslations(records, tableName, 'fr_BE', this.languageTranslations_fr_BE);
    });
  }

  async writeTranslations(records, tableName, languageCode, languageTranslations) {
    const filePath = path.join(__dirname, '..', '..', 'src', 'assets', 'locale', languageCode, `${tableName}.json`);
    try {
      await fs.writeFile(filePath, JSON.stringify(languageTranslations, null, 2));
      console.log(`Successfully updated ${tableName} for ${languageCode} with ${records.length} entries.`);
    } catch (writeError) {
      if (writeError.code === 'ENOENT') {
        console.error(`Error updating ${tableName}: ${writeError.message}. No such file or directory.`);
      } else {
        console.error(`Error updating ${tableName}: ${writeError.message}`);
      }
    }
  }

  async base(tableName, offset) {
    const uri = `/v${this.apiVersion}/${this.baseId}/${tableName}` + (offset ? `?offset=${offset}` : '');

    return this.require()({
      uri,
      method: 'GET'
    });
  }

  async testbase(tableName) {
    let allRecords = [];
    let offset;

    const response = await this.require()({
        uri: `/v${this.apiVersion}/${this.baseId}/${tableName}`,
        method: 'GET'
      });

      if (response.records.length > 0) {
        allRecords.push(...response.records);
      }
      offset = response.offset;
    let currentOffset;
    if (offset) {
      currentOffset = response.offset;
      offset = undefined;
      do {
        const resp = await this.require()({
          uri: `/v${this.apiVersion}/${this.baseId}/${tableName}?offset=${currentOffset}`,
          method: 'GET'
        });

        if (resp.records.length > 0) {
          allRecords.push(...resp.records);
          currentOffset = resp.offset;
        } else {
          currentOffset = undefined;
          break; // No more records to fetch
        }
      } while (currentOffset);
    }

    return allRecords;
  }

   updateTranslations() {
      this.tables.map(async (tableName) => {
        try {
          let allRecords = [];
          const response = await this.testbase(tableName);
          if (response && response.length > 0) {
            allRecords.push(...response);
          }

          const lines = allRecords.map((rec) => ({
            key: rec.fields['Key'],
            en: (rec.fields['English'] || '').trim(),
            en_GB: (rec.fields['English_UK'] || '').trim(),
            de_CH: (rec.fields['German_DE'] || '').trim(),
            de: (rec.fields['German_DE'] || '').trim(),
            fr_CH: (rec.fields['French'] || '').trim(),
            fr: (rec.fields['French_FR'] || '').trim(),
            it_CH: (rec.fields['Italian'] || '').trim(),
            it: (rec.fields['Italian_IT'] || '').trim(),
            nl: (rec.fields['Dutch'] || '').trim(),
            pl: (rec.fields['Polish'] || '').trim(),
            es: (rec.fields['Spanish'] || '').trim(),
            pt: (rec.fields['Portugese'] || '').trim(),
            no: (rec.fields['Norwegian'] || '').trim(),
            sv: (rec.fields['Swedish'] || '').trim(),
            da: (rec.fields['Danish'] || '').trim(),
            nl_BE: (rec.fields['Dutch_BE'] || '').trim(),
            fr_BE: (rec.fields['French_BE'] || '').trim()
          }));

          await this.upTranslations(allRecords, tableName, lines);

        } catch (err) {
          if (err.code === 'ENOENT') {
            console.error(`Error reading ${tableName} from Airtable: ${err.message}. No such file or directory.`);
          } else {
            console.error(`Error reading ${tableName} from Airtable: ${err.message}`);
          }
        }
      }
    );

    console.log('Updated translations!');
  }
}

// Verwendung der Klasse
const AIRTABLE_BASE = 'appO3hlDxAHVtDaI7';
const headers = {
  'Authorization': 'Bearer patcqRV60b34Ujcqu.e593277c6d88f7db4c03f7f8ea141709306423769b76ce0b2c1cb5433d142927'
};

const airtableManager = new AirtableManager(AIRTABLE_BASE, headers);
airtableManager.configure('https://api.airtable.com', '0');
airtableManager.updateTranslations();
