exports.getPaginatedRecords = async (
    model,
    { limit: specifiedLimit = 10, page, data = {}, selectedFields }
  ) => {
    try {
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
  
      const modelData = await model.findAndCountAll({ 
        limit, offset, where: data
      });
  
      const result = await model.findAll({
        where: { ...data, deleted: false },
        order: [
          ["created_at", "DESC"]
        ],
        attributes: selectedFields? selectedFields: [],
      })
      return {
        data: result,
        total: modelData,
        currentPage: page,
        hasNext: page * limit < modelData,
        hasPrevious: page > 1,
        perPage: limit,
        totalPages: Math.ceil(modelData / limit),
      };
    } catch (err) {
      console.log(err);
    }
  };
  

  exports.getPaginatedRecordsMultipleRecords = async (
    model_1, model_2, 
    { limit: specifiedLimit = 10, page, data1 = {}, data2={}, selectedFields1, selectedFields2  }
  ) => {
    try {
      const allResults =[]
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
  
      const modelData1 = await model_1.findAndCountAll({ 
        limit, offset, where: data1
      });
      
      const modelData2 = await model_2.findAndCountAll({ 
        limit, offset, where: data2
      });

      const result1 = await model_1.findAll({
        where: { ...data1, deleted: false },
        order: [
          ["created_at", "DESC"]
        ],
        attributes: selectedFields1? selectedFields1: [],
      })


      const result2 = await model_2.findAll({
        where: { ...data2, deleted: false },
        order: [
          ["created_at", "DESC"]
        ],
        attributes: selectedFields2? selectedFields2: [],
      })
      for (const model of result1){
        allResults.push(model)
      }
      for (const model of result2){
        allResults.push(model)
      }
      const modelData = modelData1+modelData2
      return {
        data: allResults,
        total: modelData,
        currentPage: page,
        hasNext: page * limit < modelData,
        hasPrevious: page > 1,
        perPage: limit,
        totalPages: Math.ceil(modelData / limit),
      };
    } catch (err) {
      console.log(err);
    }
  };