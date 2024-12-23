import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/employee_form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddEmployeeMutation } from '../../app/services/employees'
import { Employee } from '@prisma/client'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/is_error_with_message'

export const AddEmployee = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [addEmployee] = useAddEmployeeMutation()

    useEffect(() => {
        if (!user) navigate('/login')
    }, [navigate, user])

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap()

            navigate(`${Paths.status}/created`)
        } catch (err) {
            const maybeError = isErrorWithMessage(err)

            if (maybeError) {
                setError(err.data.message)
            } else {
                setError('Unknown error!')
            }
        }
    }
  return (
    <Layout>
        <Row align='middle' justify='center' >
            <EmployeeForm title='Add employee' btnText='Add' onFinish={handleAddEmployee} error={error} />
        </Row>
    </Layout>
  )
}
