"use client";

import React from 'react';

export default function ErrorBoundary({error}: {error: Error}) {
    return (
        <div>
            <p>{error.message}</p>
        </div>
    )
};
