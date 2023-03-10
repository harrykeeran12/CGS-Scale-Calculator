import './App.css';
import { useState } from 'react';
interface IFormData {
  assignments: number[],
  weighting: number[]
}
interface IOutputData {
  totalNumber: number,
  totalCGSGrade: string | undefined
}
export default function App() {

  const [FormData, setFormData] = useState<IFormData>({ "assignments": [], "weighting": [] });
  const [OverallGrades, setOverallGrades] = useState<IOutputData>({ "totalNumber": 0, "totalCGSGrade": '' });
  const CGSMap = new Map(Object.entries({
    0: 'G3', 1: 'G2', 2: 'G1', 3: 'F3', 4: 'F2', 5: 'F1', 6: 'E3', 7: 'E2', 8: 'E1', 9: 'D3', 10: 'D2', 11: 'D1', 12: 'C3', 13: 'C2', 14: 'C1', 15: 'B3', 16: 'B2', 17: 'B1', 18: 'A5', 19: 'A4', 20: 'A3', 21: 'A2', 22: 'A1'
  }))

  function calculateTotalGrade(newFormData: IFormData) {
    let n;
    newFormData.assignments.length === newFormData.weighting.length ? n = newFormData.assignments.length : n = 0;
    let total = 0;

    for (let i = 0; i < n; i++) {
      total += newFormData.assignments[i] * newFormData.weighting[i];
    }
    return Math.floor(total);
  }

  function mapGrade(gradeNumber: number) {

    if (CGSMap.get(gradeNumber.toString()) != undefined) {
      setOverallGrades({ "totalNumber": gradeNumber, "totalCGSGrade": CGSMap.get(gradeNumber.toString()) });
      console.log(OverallGrades);
      return { "totalNumber": gradeNumber, "totalCGSGrade": CGSMap.get(gradeNumber.toString()) }
    }


  }


  return (
    <main>
      <p className='display-3 m-5'>CGS Calculator</p>
      <div className="d-flex flex-row justify-content-center align-items-start container-fluid">
        <div className='v-stack p-3 w-100'>
          <div className='col'>
            <form className='h-25 d-flex flex-column gap-2 container-fluid justify-content-center w-50'>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Add CGS number grades(separate via commas)" onChange={(e) => {
                  let assignmentValues: number[] = (e.target.value.split(',').map((n) => Number.parseInt(n)));
                  if (FormData != undefined) {
                    setFormData({ "assignments": assignmentValues, "weighting": FormData.weighting });
                  }

                }}></input>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Add weightings(separate via commas)" onChange={(e) => {
                  let weightingValues: number[] = (e.target.value.split(',').map((n) => Number.parseFloat(n)));
                  if (FormData != undefined) {
                    setFormData({ "assignments": FormData.assignments, "weighting": weightingValues });
                  }
                }}></input>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => {
                console.log(calculateTotalGrade(FormData));
                console.log(mapGrade(calculateTotalGrade(FormData)))
              }}>Find grade</button>
            </form>
          </div>
          <div className='col'>
            <div className="d-flex flex-row justify-content-center align-items-center">
              {OverallGrades.totalNumber == 0 ? <p></p> :
                <h1>Your overall grade was a <br></br>
                  {OverallGrades.totalCGSGrade} = {OverallGrades.totalNumber}
                </h1>
              }

            </div>

          </div>

        </div>
        <div className="p-3 d-flex justify-content-center align-items-center">
          <table className="table table-striped-columns w-25 h-25 lh-sm">
            <thead>
              <tr>
                <th scope="col" className='h6'>Numerical Value </th>
                <th scope="col" className='h6'>Approximate Percentage(/22) </th>
                <th scope="col" className='h6 text-muted'>CGS Grade</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(CGSMap.entries()).map((entry) => {
                const [key, value] = entry;
                return (
                  <tr>
                    <th>{key}</th>
                    <td>{Math.round(Number.parseInt(key) / 22 * 100) + '%'}</td>
                    <td className='text-muted'>{value}</td>
                  </tr>)
              })}



            </tbody>
          </table>
        </div>
      </div>
      
    </main >
  )
}
