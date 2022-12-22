import './App.css';
import { useState } from 'react';
export default function App() {
  const [FormData, setFormData] = useState({ assignment: "", weightings: "" });
  const [Output, setOutput] = useState([null, null]);
  function Calculator(assignments, weightings) {

    let n;
    assignments.length === weightings.length ? n = assignments.length : n = 0;
    let total = 0;

    for (let i = 0; i < n; i++) {
      total += assignments[i] * weightings[i];
    }
    return Math.floor(total);

  }
  function returnGrade(numberGrade) {

    let CGSMap = {
      0: 'G3', 1: 'G2', 2: 'G1', 3: 'F3', 4: 'F2', 5: 'F1', 6: 'E3', 7: 'E2', 8: 'E1', 9: 'D3', 10: 'D2', 11: 'D1', 12: 'C3', 13: 'C2', 14: 'C1', 15: 'B3', 16: 'B2', 17: 'B1', 18: 'A5', 19: 'A4', 20: 'A3', 21: 'A2', 22: 'A1'
    }
    return Object.entries(CGSMap).find(i => i[0] == numberGrade);

  }
  function splitIntegerArray(strings) {
    console.log(strings)
    if (strings.includes('%')) {
      strings = strings.replace(/%/g, '');
    }

    let stringArray = strings.split(',');
    try {
      //Check if this is the assignment list or the weighting list
      let intArray = stringArray.map(s => Integer.parseInt(s));
      return intArray;
    }
    catch (NumberFormatException) {
      console.log("Number format exception.")
    }


  }
  function calculateCGSGrade() {
    let assignmentInteger = splitIntegerArray(FormData["assignment"]);

    let weightingsInteger = splitIntegerArray(FormData["weightings"]);
    console.log(assignmentInteger, weightingsInteger);
    let CGSTotalNumber = Calculator(assignmentInteger, weightingsInteger);
    setOutput(returnGrade(CGSTotalNumber));
  }
  return (
    <main>
      <p className='display-3 mb-5'>CGS Calculator</p>
      <div className='row p-3'>
        <div className='col'>
          <form className='h-25 d-flex flex-column gap-2 container-fluid justify-content-center w-50'>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Add CGS number grades(separate via commas)" value={FormData["assignment"]}
                onChange={(e) => setFormData({ assignment: e.target.value, weightings: FormData["weightings"] })}></input>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Add weightings(separate via commas)" value={FormData["weightings"]}
                onChange={(e) => { setFormData({ assignment: FormData["assignment"], weightings: e.target.value }); console.log(FormData); }}></input>
            </div>
            <button type="submit" className="btn btn-primary" onClick={calculateCGSGrade}>Find grade</button>
          </form>
        </div>
        {Output[0] == null ? <div></div> : <div className='col'>{Output[0]}, {Output[1]}</div>}
      </div>



    </main >
  )
}
