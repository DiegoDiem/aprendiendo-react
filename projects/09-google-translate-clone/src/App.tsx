import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    fromText,
    result,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  return (
    <Container fluid>
      <h1>Google translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type= {SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />

            <TextArea
            loading={loading}
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
        <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
          <ArrowsIcon />
        </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type= {SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            <TextArea
            loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>

      </Row>
      {/* <h2>Te amo amorcito ❤</h2>
      <h3>Att:</h3> */}
    </Container>
  )
}

export default App
