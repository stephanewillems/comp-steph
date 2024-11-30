import React from 'react'
import { motion } from 'framer-motion'


interface RedLineProps {
    isHovered: boolean
}

const RedLine = ({ isHovered }: RedLineProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16">
        <motion.path
            d="M13.793.793a1 1 0 0 1 1.414 1.414l-13 13a1 1 0 1 1-1.414-1.414l13-13z"
            stroke="#ED0008"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        />
    </svg>
)

export default RedLine