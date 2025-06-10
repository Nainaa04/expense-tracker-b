const xlsx = require('xlsx');
const Income = require("../models/Income");



//add income source
exports.addIncome = async(req,res)=>{
    const userId = req.user.id;
    try{
        const{icon,source,amount,date}=req.body;
        if(!source || !amount ||!date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

//get all income source
exports.getAllIncome = async(req,res)=>{
    const userId=req.user.id;

    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.json(income);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

//delete income source
exports.deleteIncome = async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

//download excel


exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Income.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString(),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Download Error:", error); // 👈 check terminal
    res.status(500).json({ message: "Server Error" });
  }
};


