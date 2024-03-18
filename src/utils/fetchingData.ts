const SteinStore = require("stein-js-client");

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/65e19b574a642363120a3aa5"
);

export const useSteinData = (sheetName: string) => {
  try {
    const data = store.read(sheetName);
    return data;
  } catch (error) {
    console.error("error fetching data", error);
    throw error;
  }
};

export const addData = async (sheetName: string, data: any) => {
  try {
    const res = await store.append(sheetName, [data]);
    return {
      code: 200,
      success: true,
      message: "add data successfully",
      data: res,
    };
  } catch (error) {
    return {
      code: 400,
      success: false,
      message: "add data failed",
      data: error,
    };
  }
};

export const getData = async (
  sheetName: string,
  row: string,
  value: string
) => {
  try {
    const searchObject: any = {};
    searchObject[row] = value;

    const res = await store.read(sheetName, { search: searchObject });
    return {
      code: 200,
      success: true,
      message: "get data successfully",
      data: res,
    };
  } catch (error) {
    return {
      code: 400,
      success: false,
      message: "add data failed",
      data: error,
    };
  }
};

export const updateData = async (
  sheetName: string,
  rowId: string,
  value: string,
  rowEdit: string,
  valueEdit: string
) => {
  try {
    const serachObject: any = {};
    const setUpdate: any = {};

    serachObject[rowId] = value;
    setUpdate[rowEdit] = valueEdit;

    const res = await store.edit(sheetName, {
      search: serachObject,
      set: setUpdate,
      limit: 1,
    });

    return {
      code: 200,
      success: true,
      message: "update data successfully",
      data: res,
    };
  } catch (error) {
    return {
      code: 400,
      success: false,
      message: "update data failed",
      data: error,
    };
  }
};
