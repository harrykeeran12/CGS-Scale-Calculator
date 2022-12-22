import './App.css';
import { useState } from 'react';
interface IFormData {
  assignments: Number[],
  weighting: Number[]
}
export default function App() {

  const [FormData, setFormData] = useState<IFormData>({ "assignments": [], "weighting": [] });
  
  return (
    <main>
      <p className='display-3 mb-5'>CGS Calculator</p>
      <div className='row p-3'>
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
            <button type="button" className="btn btn-primary" onClick={() => console.log(FormData)}>Find grade</button>
          </form>
        </div>
      </div>
    </main >
  )
}
