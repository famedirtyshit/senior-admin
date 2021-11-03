import axios from "axios";

const adminUtil = {
  functionName: async (paramA) => {
    try {
      let res = await axios.get(process.env.API_KEY + `adminHandlerPath/${paramA}`);
      return res;
    } catch (e) {
      return e.response;
    }
  }
};

export default adminUtil;
