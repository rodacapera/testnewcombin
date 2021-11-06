import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from "react-input-mask";

function CreateUser(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser} = props;

    const onSubmit = (data) => {
        createUser(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <input type="text" {...register("firstName", { required: true })} />
            {errors.firstName && <span>Este campo es requerido</span>}
            <label>Last Name</label>
            <input type="text" {...register("lastName", { required: true })} />
            {errors.lastName && <span>Este campo es requerido</span>}
            <label>Address</label>
            <input type="text" {...register("address", { required: true })} />
            {errors.address && <span>Este campo es requerido</span>}
            <label>SSN</label>
            <InputMask mask="999-99-9999" type="text" {...register("ssn", { required: true })} />
            {errors.ssn && (<><span>Este campo es requerido</span><br /><br /></>)}
            <table>
                <tbody>
                    <tr>
                        <td width="50%" style={{borderBottom: 0 }}><button onClick={() => reset({ firstName: "", lastName: "", address: "", ssn: "" }) }>Reset</button></td>
                        <td width="50%" style={{textAlign: 'right', borderBottom: 0 }}><button>Add new user</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default CreateUser