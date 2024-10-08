import axios from "axios";
import { Readable } from "stream";
import * as FormData from "form-data"

export default class Rental {
    private apiKey: string;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
    }
  
    
    public async pinFile(fileStream: Readable): Promise<any> {
      var data = new FormData();
      data.append('file', fileStream);

      var config = {
        method: 'post',
        url: 'https://be.renthub.cloud/sdk/rental',
        headers: { 
          'api-key': this.apiKey, 
          ...data.getHeaders()
        },
        data : data
      };
      
      return axios(config).then(res=>res.data)
      .catch(err => {
        console.error('Error fetching data:', err.message);
        throw new Error("Error while pinning the file.");
      });
    }
    
    public async pinJson(json: any): Promise<any> {
      if (typeof json !== 'object') {
        throw new Error("Invalid json object.");
      }
      var config = {
        method: 'post',
        url: 'https://be.renthub.cloud/sdk/rental/pinJson',
        headers: { 
          'api-key': this.apiKey, 
        },
        data : { json }
      };
      
      return axios(config).then(res=>res.data)
      .catch(err => {
        console.error('Error fetching data:', err.message);
        throw new Error("Error while pinning the file.");
      });
    }

    public async getJson(cid: string){
      var config = {
        method: 'get',
        url: 'https://gateway.btfs.io/btfs/'+cid,
        headers: {
          'api-key': this.apiKey,
        }
      };
      return axios(config).then(res=>res.data);
    }
}
  