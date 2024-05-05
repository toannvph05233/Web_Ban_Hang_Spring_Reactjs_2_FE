import {RingLoader} from "react-spinners";

export function LoadingButton({ loading }) {
    if (loading) {
        return (
            <p className="loading-button" style={{width:'100px',fontSize:'14px'}}>
                Đang tải..
                <RingLoader color="#36D7B7" loading={loading} size={30} />
            </p>
        );
    } else {
        return (
            <button disabled={loading} className="btn"  style={{width:'80px',fontSize:'14px',}} type={'submit'} >
                <i className="fa-regular fa-floppy-disk" style={{color: "#dd0e18"}}></i>  Lưu
            </button>
        );
    }
}
