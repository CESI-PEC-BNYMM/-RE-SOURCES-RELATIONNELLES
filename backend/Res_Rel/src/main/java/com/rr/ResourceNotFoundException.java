package com.rr;

public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    /**
     * Constructs a new ResourceNotFoundException with the specified message.
     *
     * @param message The message describing the error.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new ResourceNotFoundException with the specified message and cause.
     *
     * @param message The message describing the error.
     * @param cause The cause of the error.
     */
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
