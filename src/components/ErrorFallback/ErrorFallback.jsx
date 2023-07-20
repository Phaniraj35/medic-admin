import Container from "react-bootstrap/Container";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUnlink} from "@fortawesome/free-solid-svg-icons";
import './ErrorFallback.scss';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="wrapper-error">

            <Container fluid>

                <section className="text-center">

                    {/*<p>Something went wrong:</p>*/}
                    {/*<pre style={{ color: "red" }}>{error.message}</pre>*/}
                    <div className="errorModule">
                        {/* <div>
                            <FontAwesomeIcon icon={faUnlink} className="errorIcon"/>
                        </div> */}
                        <div className="errorMsg mt-3">Oops! Something Went Wrong.</div>

                        <div className="mt-4">
                            <button className="try-again" onClick={resetErrorBoundary}>
                                Try Again
                            </button>
                        </div>
                    </div>

                </section>

            </Container>

        </div>
    );
};

export default ErrorFallback;