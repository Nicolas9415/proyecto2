import React, { Component } from 'react';

class Pdf extends Component {

  constructor() {
    super();
    this.state = {
      informacionContacto: '',
      resumen: '',
      educacion: '',
      experiencia: '',
      habilidades: '',
      idiomas: '',
      _id: '',
      tasks: []
     
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }


  addTask(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch(`/api/formularios/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          informacionContacto: this.state.informacionContacto,
          resumen: this.state.resumen,
          educacion: this.state.educacion,
          experiencia: this.state.experiencia,
          habilidades: this.state.habilidades,
          idiomas: this.state.idiomas
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({ html: 'Hoja de vida actualizada' });
          this.setState({ _id: '', informacionContacto: '', resumen: '', educacion: '', experiencia: '', habilidades: '', idiomas: '' });
          this.fetchTasks();
        });
    } else {
      fetch('/api/formularios', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({ html: 'Hoja de vida guardada' });
          this.setState({ informacionContacto: '', resumen: '', educacion: '', experiencia: '', habilidades: '', idiomas: '' });
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) {
    if (confirm('esta seguro que quiere borrar la hoja de vida?')) {
      fetch(`/api/formularios/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: 'Hoja de vida borrada' });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/formularios/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          informacionContacto: data.informacionContacto,
          resumen: data.resumen,
          educacion: data.educacion,
          experiencia: data.experiencia,
          habilidades: data.habilidades,
          idiomas: data.idiomas,
          _id: data._id
        });
      });
  }


  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/formularios')
      .then(res => res.json())
      .then(data => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Hoja de vida</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">

                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="informacionContacto" onChange={this.handleChange} value={this.state.informacionContacto} type="text" placeholder="Informacion de contacto" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="resumen" onChange={this.handleChange} value={this.state.resumen} cols="30" rows="10" placeholder="Resumen" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="educacion" onChange={this.handleChange} value={this.state.educacion} cols="30" rows="10" placeholder="Educacion" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="experiencia" onChange={this.handleChange} value={this.state.experiencia} cols="30" rows="10" placeholder="Experiencia" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="habilidades" onChange={this.handleChange} value={this.state.habilidades} cols="30" rows="10" placeholder="Habilidades" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="idiomas" onChange={this.handleChange} value={this.state.idiomas} cols="30" rows="10" placeholder="Idiomas" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>

                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                
                <thead>
                  <tr>
                    <th>Informacion de Contacto</th>
                    <th>Resumen</th>
                    <th>Educacion</th>
                    <th>Experiencia</th>
                    <th>Habilidades</th>
                    <th>Idiomas</th>
                  </tr>
                </thead>
                
                <tbody>
                  {
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                        
                          <td>{task.informacionContacto}</td>
                          <td>{task.resumen}</td>
                          <td>{task.educacion}</td>
                          <td>{task.experiencia}</td>
                          <td>{task.habilidades}</td>
                          <td>{task.idiomas}</td>
                          <td>
                        
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i>
                            </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                              <i className="material-icons">edit</i>
                            </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                              <i className="material-icons">picture_as_pdf</i>
                            </button>

                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Pdf;
