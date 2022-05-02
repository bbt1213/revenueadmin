const SummaryTable = (props) => {
  const { bpAssessmentDetailWebId } = props;
  return (
    <div>
      <h5>List of Departments</h5>
      <table className="table">
        <thead>
          <tr>
            <td>Verifier / Documents</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BPLO</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>MPDC</td>
            <td>Disapproved</td>
          </tr>
          <tr>
            <td>MEC</td>
            <td>Unverified</td>
          </tr>
          <tr>
            <td>BIR</td>
            <td>Approved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
