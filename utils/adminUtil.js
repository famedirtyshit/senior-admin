import axios from "axios";

const adminUtil = {
  checkAdmin: async (firebaseId) => {
    try {
      let res = await axios.get(process.env.API_KEY + `/admin/checkAdmin/${firebaseId}`);
      console.log(process.env.API_KEY);
      return res;
    } catch (e) {
      return e.response;
    }  
  },
  getReportPost: async (firebaseId) => {
    try {
      let res = await axios.get(process.env.API_KEY + `/admin/getReportPost/${firebaseId}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  
  rejectReportPost: async (firebaseId,postId) => {
    try {
      let res = await axios.post(process.env.API_KEY + `/admin/rejectReportPost`,{fbId : firebaseId,postId : postId});
      return res;
    } catch (e) {
      return e.response;
    }
  },
  deleteReportPost: async (firebaseId,postId) => {
    try {
      let res = await axios.post(process.env.API_KEY + `/admin/deleteReportPost `,{fbId : firebaseId,postId : postId});
      return res;
    } catch (e) {
      return e.response;
    }
  }
};


export default adminUtil;
