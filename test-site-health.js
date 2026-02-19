#!/usr/bin/env node

/**
 * ⚡ Site Health Test Script
 * Проверяет функциональность и производительность сайта
 * 
 * Использование: node test-site-health.js [BASE_URL]
 * Пример: node test-site-health.js http://localhost:3000
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.argv[2] || 'http://localhost:3000';

// ANSI цвета для консоли
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

class SiteHealthTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.protocol = this.baseUrl.startsWith('https') ? https : http;
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: [],
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}]`;
    
    switch (type) {
      case 'success':
        console.log(`${colors.green}✅${colors.reset} ${prefix} ${message}`);
        break;
      case 'error':
        console.log(`${colors.red}❌${colors.reset} ${prefix} ${message}`);
        break;
      case 'warning':
        console.log(`${colors.yellow}⚠️${colors.reset} ${prefix} ${message}`);
        break;
      case 'info':
        console.log(`${colors.blue}ℹ️${colors.reset} ${prefix} ${message}`);
        break;
      case 'debug':
        console.log(`${colors.gray}🔍${colors.reset} ${prefix} ${message}`);
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }

  async fetchUrl(url) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      this.protocol.get(url, { 
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const loadTime = Date.now() - startTime;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
            loadTime,
            size: data.length,
          });
        });
      }).on('error', (error) => {
        resolve({
          status: 0,
          error: error.message,
          loadTime: Date.now() - startTime,
        });
      });
    });
  }

  checkPageStatus(url, name) {
    return new Promise((resolve) => {
      this.fetchUrl(url).then((response) => {
        const passed = response.status >= 200 && response.status < 300;
        
        if (passed) {
          this.results.passed++;
          this.log(
            `${name} - Status: ${response.status} (${response.loadTime}ms, ${Math.round(response.size / 1024)}KB)`,
            'success'
          );
        } else if (response.status === 0) {
          this.results.failed++;
          this.log(`${name} - Connection failed: ${response.error}`, 'error');
        } else {
          this.results.failed++;
          this.log(`${name} - Status: ${response.status} (expected 200)`, 'error');
        }

        resolve({ url, name, status: response.status, loadTime: response.loadTime, body: response.body });
      });
    });
  }

  checkMetaTags(html, name) {
    const checks = {
      'og:title': /<meta\s+property="og:title"/,
      'og:description': /<meta\s+property="og:description"/,
      'og:image': /<meta\s+property="og:image"/,
      'viewport': /<meta\s+name="viewport"/,
      'charset': /<meta\s+charset/,
      'theme-color': /<meta\s+name="theme-color"/,
    };

    let metaPassed = 0;
    let metaFailed = 0;

    Object.entries(checks).forEach(([tag, regex]) => {
      if (regex.test(html)) {
        metaPassed++;
        this.log(`  ✓ ${tag} found`, 'debug');
      } else {
        metaFailed++;
        this.log(`  ✗ ${tag} missing`, 'warning');
        this.results.warnings++;
      }
    });

    if (metaFailed === 0) {
      this.results.passed++;
      this.log(`${name} - All meta tags present`, 'success');
    } else {
      this.log(`${name} - Missing ${metaFailed}/${Object.keys(checks).length} meta tags`, 'warning');
    }
  }

  checkSchemaMarkup(html, name) {
    const schemaRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let schemas = [];
    let match;

    while ((match = schemaRegex.exec(html)) !== null) {
      try {
        schemas.push(JSON.parse(match[1]));
      } catch (e) {
        this.log(`  ✗ Invalid JSON-LD schema`, 'warning');
      }
    }

    if (schemas.length > 0) {
      this.results.passed++;
      this.log(`${name} - Found ${schemas.length} JSON-LD schema(s)`, 'success');
      schemas.forEach((schema, idx) => {
        this.log(`  ✓ Schema ${idx + 1}: ${schema['@type'] || 'Unknown'}`, 'debug');
      });
    } else {
      this.results.failed++;
      this.log(`${name} - No JSON-LD schema found`, 'error');
    }
  }

  checkPerformanceIndicators(html, name) {
    const checks = {
      'WebVitalsComponent': /WebVitalsComponent|web-vitals/,
      'Next Image Optimization': /<Image|next\/image/,
      'Dynamic imports': /dynamic\(/,
      'Preload resources': /rel="preload"|rel="preconnect"/,
      'Lazy loading': /loading="lazy"/,
    };

    let perfFound = 0;

    Object.entries(checks).forEach(([indicator, regex]) => {
      if (regex.test(html)) {
        perfFound++;
        this.log(`  ✓ ${indicator}`, 'debug');
      }
    });

    if (perfFound >= 3) {
      this.results.passed++;
      this.log(`${name} - Performance optimizations detected (${perfFound}/5)`, 'success');
    } else {
      this.log(`${name} - Limited performance optimizations (${perfFound}/5)`, 'warning');
      this.results.warnings++;
    }
  }

  checkImages(html, name) {
    const imageRegex = /<img|<Image/g;
    const imageCount = (html.match(imageRegex) || []).length;

    if (imageCount > 0) {
      this.log(`${name} - Found ${imageCount} image(s)`, 'success');
      this.results.passed++;
    }
  }

  checkLinks(html, name) {
    const linkRegex = /<a\s+href="([^"]+)"/g;
    const links = new Set();
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      links.add(match[1]);
    }

    if (links.size > 0) {
      this.log(`${name} - Found ${links.size} internal link(s)`, 'success');
      this.results.passed++;
    }
  }

  async runTests() {
    console.log('\n' + colors.blue + '═══════════════════════════════════════════════════════════' + colors.reset);
    console.log(colors.blue + '  🧪 SITE HEALTH TEST SUITE' + colors.reset);
    console.log(colors.blue + '═══════════════════════════════════════════════════════════' + colors.reset + '\n');

    this.log(`Testing: ${this.baseUrl}`, 'info');
    this.log(`Time: ${new Date().toLocaleString()}`, 'info');
    console.log('');

    // Test 1: Page Status Checks
    console.log(colors.cyan + '📋 PAGE STATUS CHECKS' + colors.reset);
    console.log('─────────────────────────────────────────────────────────────\n');

    const pages = [
      { url: `${this.baseUrl}/`, name: 'Homepage' },
      { url: `${this.baseUrl}/blog`, name: 'Blog' },
      { url: `${this.baseUrl}/about`, name: 'About' },
      { url: `${this.baseUrl}/contacts`, name: 'Contacts' },
      { url: `${this.baseUrl}/search`, name: 'Search' },
    ];

    const pageResults = [];
    for (const page of pages) {
      const result = await this.checkPageStatus(page.url, page.name);
      pageResults.push(result);
    }

    console.log('\n' + colors.cyan + '🔍 METADATA & SEO CHECKS' + colors.reset);
    console.log('─────────────────────────────────────────────────────────────\n');

    for (const result of pageResults) {
      if (result.body) {
        this.checkMetaTags(result.body, result.name);
      }
    }

    console.log('\n' + colors.cyan + '📝 SCHEMA & STRUCTURED DATA' + colors.reset);
    console.log('─────────────────────────────────────────────────────────────\n');

    for (const result of pageResults) {
      if (result.body) {
        this.checkSchemaMarkup(result.body, result.name);
      }
    }

    console.log('\n' + colors.cyan + '⚡ PERFORMANCE INDICATORS' + colors.reset);
    console.log('─────────────────────────────────────────────────────────────\n');

    for (const result of pageResults) {
      if (result.body) {
        this.checkPerformanceIndicators(result.body, result.name);
      }
    }

    console.log('\n' + colors.cyan + '🖼️ CONTENT CHECKS' + colors.reset);
    console.log('─────────────────────────────────────────────────────────────\n');

    for (const result of pageResults) {
      if (result.body) {
        this.checkImages(result.body, result.name);
        this.checkLinks(result.body, result.name);
      }
    }

    // Summary
    console.log('\n' + colors.blue + '═══════════════════════════════════════════════════════════' + colors.reset);
    console.log(colors.blue + '  📊 TEST SUMMARY' + colors.reset);
    console.log(colors.blue + '═══════════════════════════════════════════════════════════' + colors.reset + '\n');

    const total = this.results.passed + this.results.failed;
    const percentage = total > 0 ? Math.round((this.results.passed / total) * 100) : 0;

    console.log(`${colors.green}✅ Passed:  ${this.results.passed}${colors.reset}`);
    console.log(`${colors.red}❌ Failed:  ${this.results.failed}${colors.reset}`);
    console.log(`${colors.yellow}⚠️ Warnings: ${this.results.warnings}${colors.reset}`);
    console.log(`\n📈 Success Rate: ${percentage}% (${this.results.passed}/${total} tests)\n`);

    // Health Status
    if (percentage >= 90) {
      console.log(colors.green + '🟢 HEALTH STATUS: EXCELLENT' + colors.reset);
    } else if (percentage >= 75) {
      console.log(colors.yellow + '🟡 HEALTH STATUS: GOOD' + colors.reset);
    } else if (percentage >= 50) {
      console.log(colors.yellow + '🟡 HEALTH STATUS: FAIR - IMPROVEMENTS NEEDED' + colors.reset);
    } else {
      console.log(colors.red + '🔴 HEALTH STATUS: POOR - URGENT ACTION REQUIRED' + colors.reset);
    }

    console.log('\n' + colors.blue + '═══════════════════════════════════════════════════════════\n' + colors.reset);

    // Recommendations
    if (this.results.failed > 0 || this.results.warnings > 0) {
      console.log(colors.yellow + '💡 RECOMMENDATIONS:' + colors.reset);
      console.log('  1. Fix all failed tests (marked with ❌)');
      console.log('  2. Address warnings (marked with ⚠️)');
      console.log('  3. Run audits: npx lighthouse ' + this.baseUrl);
      console.log('  4. Check Google Search Console for indexing issues\n');
    }
  }
}

// Run the test
const tester = new SiteHealthTester(BASE_URL);
tester.runTests().catch(console.error);
