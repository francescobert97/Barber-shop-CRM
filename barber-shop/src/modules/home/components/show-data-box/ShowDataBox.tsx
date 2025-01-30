import { IData } from "../../../../hooks/useIncome/useIncome";

const ShowDataBox = ({data}:{data:{name:string, value:IData}[]}) => {
    console.log(data)
  return (
    <div className="d-flex flex-column bg-primary rounded mx-2 p-2">
                    
                        { data &&
                            data.map((element) => ( 
                                <>
                                 <p>{element.name}: {element.value.money}&euro; - quantità {element.value.productAmount}</p>

                                </>      
                               

                            ))
                        }
                </div>
  );
}


export default ShowDataBox;



