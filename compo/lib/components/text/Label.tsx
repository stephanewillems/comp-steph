import React from 'react'

interface Props {
    children: React.ReactNode

}

const Label = ({ children }: Props) => (
    <label className="font-inter text-[12px] font-[700] text-primary-dark">{children}</label>
)

export default Label
