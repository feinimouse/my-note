class ExceptionTest extends Exception {
    private static final long serialVersionUID = 1L;
    ExceptionTest() {
        super(" this is my exception ");
    }
}