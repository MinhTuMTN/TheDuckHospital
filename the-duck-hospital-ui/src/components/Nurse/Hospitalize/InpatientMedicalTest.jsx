import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CreateInpatientMedicalTest from "./CreateInpatientMedicalTest";
import ListInpatientMedicalTest from "./ListInpatientMedicalTest";
import { getInpatientMedicalTests } from "../../../services/nurse/HospitalizeServices";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function InpatientMedicalTest(props) {
  const { medicalTestServices } = props;
  const { hospitalizationId } = useParams();
  const [medicalTests, setMedicalTests] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    total: 0,
  });
  const [params, setParams] = useState({
    serviceId: "",
  });

  const handleGetMedicalTests = useCallback(async () => {
    const response = await getInpatientMedicalTests(
      hospitalizationId,
      params.serviceId,
      pagination.page,
      pagination.size
    );

    if (response.success) {
      setMedicalTests(response.data.data.items);
      setPagination((prev) => {
        return {
          ...prev,
          total: response.data.data.totalItems,
        };
      });
    } else {
      enqueueSnackbar("Lấy danh sách xét nghiệm thất bại", {
        variant: "error",
      });
    }
  }, [params, hospitalizationId, pagination.size, pagination.page]);

  const onChangeServiceId = useCallback(
    (serviceId) => {
      setPagination((prev) => ({
        ...prev,
        page: 0,
      }));
      setParams({
        ...params,
        serviceId: serviceId,
      });
    },
    [params]
  );

  useEffect(() => {
    handleGetMedicalTests();
  }, [handleGetMedicalTests]);
  return (
    <Grid container>
      <CreateInpatientMedicalTest medicalTestServices={medicalTestServices} />
      <ListInpatientMedicalTest
        medicalTests={medicalTests}
        medicalTestServices={medicalTestServices}
        onChangeServiceId={onChangeServiceId}
        pagination={pagination}
        onPaginate={setPagination}
      />
    </Grid>
  );
}

export default InpatientMedicalTest;
