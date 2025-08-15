import { getOrganization } from '@/server/organization'
import React from 'react'

const  Test = async() => {
    const organizations= await getOrganization()
  return (
    <div>
        {
            organizations?.map((org)=>(
                <div key={org.name}>
                    <div>{org.name}</div>
                </div>
            ))
        }
    </div>
  )
}

export default Test