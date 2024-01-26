export class Periodos {
    periodo_id: number = 0;
    periodo_mes_inicio: string = '';
    periodo_mes_fin: string = '';
    periodo_anio_inicio: number = new Date().getFullYear(); 
    periodo_anio_fin: number = new Date().getFullYear();
  

    isValid(): boolean {
      const currentYear = new Date().getFullYear();
      
      return (
        typeof this.periodo_anio_inicio === 'number' &&
        typeof this.periodo_anio_fin === 'number' &&
        this.periodo_anio_inicio <= currentYear &&
        this.periodo_anio_fin >= currentYear && 
        typeof this.periodo_mes_inicio === 'string' &&
        typeof this.periodo_mes_fin === 'string'
      );
    }
  }
  